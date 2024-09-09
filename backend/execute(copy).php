<?php
// Acceso sin restricción al backend-
    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Headers: access");
    header("Access-Control-Allow-Methods: GET,POST");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "j8000542_reclam"; $contrasenia = "01voMIgima"; $nombreBaseDatos = "j8000542_reclam";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Establecer la codificación de caracteres
mysqli_set_charset($conexionBD, "utf8mb4");

if (isset($_GET["iniciar_verificar"])) {
    $fechaActual = date('Y-m-d');

    // Obtener los registros con estado 'Iniciado' o 'Demorado'
    $sqlUsuarios = $conexionBD->query("SELECT * FROM comunicacion WHERE estado IN ('Iniciado', 'Demorado')");
    
    // Verificar si hay registros
    if ($sqlUsuarios) {
        // Recorrer los resultados
        while ($usuario = $sqlUsuarios->fetch_assoc()) {
            // Comparar la fecha_v con la fecha actual
            if (strtotime($usuario['fecha_v']) == strtotime($fechaActual)) {
                // Actualizar la fecha_v y el estado
                $id = $usuario['id'];
                $destinacion = $usuario['destinacion'];
                $estado = $usuario['estado'];

                // Ejecutar la actualización utilizando consultas preparadas
                $updateQuery = $conexionBD->prepare("UPDATE comunicacion SET estado = 'Demorado', fecha_v = DATE_ADD(fecha_v, INTERVAL 7 DAY), vencimientos = vencimientos + 1 WHERE id = ?");
                $updateQuery->bind_param("i", $id);
                $updateQuery->execute();
                
                if ($updateQuery->errno) {
                    echo json_encode(["success" => 0, "message" => "Error al actualizar el registro con id $id: " . $updateQuery->error]);
                    exit();
                }

                // Si el estado es 'Iniciado', actualizar la columna demorados en la tabla destinaciones
                if ($estado == 'Iniciado') {
                    $updateDemorados = $conexionBD->prepare("UPDATE destinaciones SET demorados = demorados + 1 WHERE clave_poder = ?");
                    $updateDemorados->bind_param("s", $destinacion);
                    $updateDemorados->execute();
                    
                    if ($updateDemorados->errno) {
                        echo json_encode(["success" => 0, "message" => "Error al actualizar la columna demorados para destinacion $destinacion: " . $updateDemorados->error]);
                        exit();
                    }
                }
            }
        }
        echo json_encode(["success" => 1, "message" => "Se han verificado todas las fechas con éxito!"]);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al obtener registros: " . $conexionBD->error]);
    }
    exit();
}



// Cerrar conexión
$conexionBD->close();

?>