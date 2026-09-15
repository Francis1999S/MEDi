<?php
// Acceso restringido al backend-
//    $allowed_origin = "https://tinogasta.gob.ar";
//    header("Access-Control-Allow-Origin: $allowed_origin");

// Acceso sin restricción al backend-
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost";
$usuario = "u638824328_medi";
$contrasenia = "#4?q2GRToT";
$nombreBaseDatos = "u638824328_medi";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Establecer la codificación de caracteres
mysqli_set_charset($conexionBD, "utf8mb4");

//Inserta un nuevo registro
$insert_sql = "INSERT INTO mensajes (mensaje) VALUES ('La solicitud HTTP ha funcionado correctamente')";

if ($conexionBD->query($insert_sql) === TRUE) {
    echo json_encode(["success" => 1, "message" => "Nuevo mensaje insertado"]);
} else {
    echo json_encode(["error" => "Error al insertar nuevo mensaje: " . $conexionBD->error]);
}
// Cerrar conexión
$conexionBD->close();

?>