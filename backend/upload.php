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

// Directorio donde se guardarán los archivos
$directorio_destino1 = "Files/";

// Si no existe el directorio, intenta crearlo
if (!file_exists($directorio_destino1)) {
    mkdir($directorio_destino1, 0777, true);
}

// Verificar si se ha enviado un archivo
if (isset($_FILES['file1'])) {
    $archivo1 = $_FILES['file1'];

    // Obtener el nombre del archivo
    $nombre_archivo1 = basename($archivo1['name']);

    $ruta_archivo1 = $directorio_destino1 . $nombre_archivo1;

    // Mover el archivo al directorio de destino
    if (move_uploaded_file($archivo1['tmp_name'], $ruta_archivo1)) {
        // Generar la URL de descarga del archivo
        $url_descarga1 = "https://tinogasta.gob.ar/MEDi/Files/" . $nombre_archivo1;

        // Devolver la URL de descarga como respuesta
        echo json_encode(['url1' => $url_descarga1]);
    } else {
        http_response_code(500);
        echo json_encode(['error' => 'Error al mover el archivo al servidor.']);
    }
} else {
    http_response_code(400);
    echo json_encode(['error' => 'No se ha recibido ningún archivo.']);
}
?>