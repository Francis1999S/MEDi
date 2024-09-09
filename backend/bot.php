<?php
// Tu token de acceso del bot de Telegram
$botToken = '6725144049:AAHE5U5hqFJpGZLMLkIZAuF66lvwIzR98OQ';
$website = 'https://api.telegram.org/bot'.$botToken;
$input = file_get_contents('php://input');
$update = json_decode($input, TRUE);

// La ID del chat o el nombre de usuario de Telegram al que quieres enviar el mensaje
$chatId = "7072153235";

// El mensaje que quieres enviar
$message = "Hola, este es un mensaje enviado desde un script PHP!";

// La URL de la API de Telegram para enviar un mensaje
$url = "https://api.telegram.org/bot$botToken/sendMessage";

// Los datos a enviar en la solicitud POST
$postFields = array(
    'chat_id' => $chatId,
    'text' => $message
);

// Inicializar cURL
$ch = curl_init();

// Configurar cURL para realizar una solicitud POST
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Ejecutar la solicitud y obtener la respuesta
$response = curl_exec($ch);

// Cerrar la conexión cURL
curl_close($ch);

// Mostrar la respuesta (opcional)
echo $response;
?>
