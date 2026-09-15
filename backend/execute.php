<?php
// Acceso sin restricción al backend-
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/db.php';
$conexionBD = medi_conectar();

if (isset($_GET["iniciar_verificar"])) {
    $fechaActual = date('Y-m-d');

    try {
        // Obtener los registros con estado 'Iniciado' o 'Demorado'
        $sqlUsuarios = $conexionBD->query("SELECT * FROM comunicacion WHERE estado IN ('Iniciado', 'Demorado')");

        // Recorrer los resultados
        while ($usuario = $sqlUsuarios->fetch()) {
            // Comparar la fecha_v con la fecha actual
            if (strtotime($usuario['fecha_v']) == strtotime($fechaActual)) {
                // Actualizar la fecha_v y el estado
                $id = $usuario['id'];
                $destinacion = $usuario['destinacion'];
                $estado = $usuario['estado'];

                // Ejecutar la actualización utilizando consultas preparadas
                $updateQuery = $conexionBD->prepare("UPDATE comunicacion SET estado = 'Demorado', fecha_v = fecha_v + INTERVAL '7 day', vencimientos = vencimientos + 1 WHERE id = :id");
                $updateQuery->execute([':id' => $id]);

                // Si el estado es 'Iniciado', actualizar la columna demorados en la tabla destinaciones
                if ($estado == 'Iniciado') {
                    $updateDemorados = $conexionBD->prepare("UPDATE destinaciones SET demorados = demorados + 1 WHERE clave_poder = :destinacion");
                    $updateDemorados->execute([':destinacion' => $destinacion]);
                }
            }
        }

        // Actualizar la columna contador_dias para todos los registros con estado 'Iniciado' o 'Demorado'
        $conexionBD->exec("
            UPDATE comunicacion
            SET contador_dias = ROUND(EXTRACT(EPOCH FROM (LOCALTIMESTAMP - (fecha + hora))) / 86400)::integer
            WHERE estado IN ('Iniciado', 'Demorado')
        ");

        // Actualizar la columna contador_dias_p para todos los registros con estado 'Pendiente'
        $conexionBD->exec("
            UPDATE comunicacion
            SET contador_dias_p = ROUND(EXTRACT(EPOCH FROM (LOCALTIMESTAMP - (fecha + hora))) / 86400)::integer
            WHERE estado IN ('Pendiente')
        ");

        echo json_encode(["success" => 1, "message" => "Se han verificado todas las fechas con exito y se ha actualizado el contador de dias!"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => 0, "message" => "Error al verificar/actualizar registros: " . $e->getMessage()]);
    }
    exit();
}

?>
