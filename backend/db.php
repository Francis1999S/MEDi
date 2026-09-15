<?php
// Conexión centralizada a la base de datos PostgreSQL (Neon).
// La cadena de conexión se lee de la variable de entorno DATABASE_URL,
// que puede definirse en el panel de hosting o en un archivo .env
// (no versionado) ubicado junto a este archivo.

function medi_cargar_env(string $ruta): void
{
    if (!is_file($ruta)) {
        return;
    }

    foreach (file($ruta, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES) as $linea) {
        $linea = trim($linea);
        if ($linea === '' || $linea[0] === '#') {
            continue;
        }

        [$nombre, $valor] = array_pad(explode('=', $linea, 2), 2, '');
        $nombre = trim($nombre);
        $valor = trim($valor, " \t\n\r\0\x0B\"'");

        if ($nombre !== '' && getenv($nombre) === false) {
            putenv("$nombre=$valor");
        }
    }
}

medi_cargar_env(__DIR__ . '/.env');

function medi_construir_dsn(string $host, string $puerto, string $baseDeDatos, array $opciones, bool $incluirChannelBinding): string
{
    $dsn = "pgsql:host=$host;port=$puerto;dbname=$baseDeDatos";

    if (!empty($opciones['sslmode'])) {
        $dsn .= ";sslmode={$opciones['sslmode']}";
    }

    if ($incluirChannelBinding && !empty($opciones['channel_binding'])) {
        $dsn .= ";channel_binding={$opciones['channel_binding']}";
    }

    // Neon usa SNI para enrutar cada conexión al endpoint correcto detrás del
    // pooler. Con una libpq vieja (frecuente en hosting compartido) esto falla
    // con "Endpoint ID is not specified", así que lo pasamos explícito como
    // recomienda Neon: https://neon.tech/sni
    $endpointId = strstr($host, '.', true) ?: $host;
    if ($endpointId !== '' && str_starts_with($endpointId, 'ep-')) {
        $dsn .= ";options=endpoint=$endpointId";
    }

    return $dsn;
}

function medi_error_fatal(string $mensaje): void
{
    http_response_code(500);
    echo json_encode(["error" => $mensaje]);
    exit();
}

// Abre (o reutiliza) la conexión PDO a PostgreSQL para el resto del backend.
function medi_conectar(): PDO
{
    static $pdo = null;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $databaseUrl = getenv('DATABASE_URL');
    if (!$databaseUrl) {
        medi_error_fatal("No se configuró la variable de entorno DATABASE_URL");
    }

    $partes = parse_url($databaseUrl);
    if ($partes === false || !isset($partes['host'], $partes['user'], $partes['pass'], $partes['path'])) {
        medi_error_fatal("DATABASE_URL tiene un formato inválido");
    }

    $host = $partes['host'];
    $puerto = (string) ($partes['port'] ?? 5432);
    $usuario = urldecode($partes['user']);
    $contrasenia = urldecode($partes['pass']);
    $baseDeDatos = ltrim($partes['path'], '/');

    parse_str($partes['query'] ?? '', $opciones);

    $atributos = [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ];

    try {
        $dsn = medi_construir_dsn($host, $puerto, $baseDeDatos, $opciones, true);
        $pdo = new PDO($dsn, $usuario, $contrasenia, $atributos);
        return $pdo;
    } catch (PDOException $e) {
        // Algunas versiones de libpq (comunes en hosting compartido) no reconocen
        // "channel_binding". Reintentamos sin ese parámetro antes de fallar.
        if (!empty($opciones['channel_binding']) && stripos($e->getMessage(), 'channel_binding') !== false) {
            try {
                $dsn = medi_construir_dsn($host, $puerto, $baseDeDatos, $opciones, false);
                $pdo = new PDO($dsn, $usuario, $contrasenia, $atributos);
                return $pdo;
            } catch (PDOException $e2) {
                medi_error_fatal("No se pudo conectar a la base de datos: " . $e2->getMessage());
            }
        }

        medi_error_fatal("No se pudo conectar a la base de datos: " . $e->getMessage());
    }
}

?>
