<?php
// Acceso restringido al backend-
//   $allowed_origin = "https://tinogasta.gob.ar";
//   header("Access-Control-Allow-Origin: $allowed_origin");

// Acceso sin restricción al backend-
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/db.php';
$conexionBD = medi_conectar();

if (isset($_GET['login_1'])) {
    $data = json_decode(file_get_contents("php://input"));
    $user = $data->user;

    // Consulta SQL para verificar si el usuario existe en la tabla "usuario"
    $stmt = $conexionBD->prepare('SELECT * FROM usuario WHERE "user" = :user LIMIT 1');
    $stmt->execute([':user' => $user]);
    $row = $stmt->fetch();

    // Verificar si se encontró algún resultado
    if ($row) {
        // Comparar la contraseña proporcionada con la contraseña almacenada
        if ($row['user'] === $user) {
            // Usuario y contraseña coinciden
            echo json_encode(array(
                "Tcgqt7LmvbzxQVpP2xu0" => true,
                "nombre" => $row['nombre'],
                "operador" => $row['operador'],
                "user" => $row['user'],
                "rol" => $row['rol']
            ));
        } else {
            // El usuario no coincide
            echo json_encode(array("Tcgqt7LmvbzxQVpP2xu0" => false));
        }
    } else {
        // El usuario no existe
        echo json_encode(array("Tcgqt7LmvbzxQVpP2xu0" => false));
    }
}

if (isset($_GET['login_2'])) {
    $data = json_decode(file_get_contents("php://input"));
    $user = $data->user;
    $pass = $data->pass;

    // Consulta SQL para verificar si el usuario existe en la tabla "usuario"
    $stmt = $conexionBD->prepare('SELECT * FROM usuario WHERE "user" = :user LIMIT 1');
    $stmt->execute([':user' => $user]);
    $row = $stmt->fetch();

    // Verificar si se encontró algún resultado
    if ($row) {
        // Comparar la contraseña proporcionada con la contraseña almacenada
        if ($row['pass'] === $pass && $row['clave_poder'] === 'UxRsyURf04IvIdkrGZHeuMIGEciXgHY059gWeuz') {
            // Usuario y contraseña coinciden
            echo json_encode(array(
                "osVgR8BlDEwfxG292UrEMX5pJ7l7" => true,
                "wZpPywiGq3kjHTH8sKTe6qaGCVsw" => true
            ));
        } else {
            if ($row['pass'] === $pass) {
                echo json_encode(array(
                    "osVgR8BlDEwfxG292UrEMX5pJ7l7" => true,
                    "wZpPywiGq3kjHTH8sKTe6qaGCVsw" => false,
                    "clave_poder" => $row['clave_poder']
                ));
            } else {
                // La contraseña no coincide
                echo json_encode(array("osVgR8BlDEwfxG292UrEMX5pJ7l7" => false));
            }
        }
    } else {
        // El usuario no existe
        echo json_encode(array("osVgR8BlDEwfxG292UrEMX5pJ7l7" => false));
    }

}

?>