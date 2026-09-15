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

require_once __DIR__ . '/db.php';
$conexionBD = medi_conectar();

// Inserta un nuevo registro
try {
    $conexionBD->exec("INSERT INTO mensajes (mensaje) VALUES ('La solicitud HTTP ha funcionado correctamente')");
    echo json_encode(["success" => 1, "message" => "Nuevo mensaje insertado"]);
} catch (PDOException $e) {
    echo json_encode(["error" => "Error al insertar nuevo mensaje: " . $e->getMessage()]);
}

?>
