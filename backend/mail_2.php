<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $data = json_decode(file_get_contents("php://input"));
    $asunto=$data->asunto;
    $nombre=$data->nombre;
    $mensaje=$data->mensaje;
    $email=$data->email;

 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\SMTP;
 use PHPMailer\PHPMailer\Exception;
 
 //Load Composer's autoloaderng
 require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if (empty($nombre) || empty($mensaje) || empty($email)) {
    echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
} else {
    try {
        //Server settings
        $mail->SMTPDebug = 2;                      //Enable verbose debug output
        $mail->isSMTP();                                            //Send using SMTP
        $mail->Host       = 'j8000542.ferozo.com';                     //Set the SMTP server to send through
        $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $mail->Username   = 'info@tinogasta.gob.ar';                     //SMTP username
        $mail->Password   = '0Xmtinogasta';                               //SMTP password
        $mail->SMTPSecure = 'ssl';            //Enable implicit TLS encryption
        $mail->Port = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
        //Recipients
        $mail->setFrom('info@tinogasta.gob.ar', 'MEDi - Contacto');
        $mail->addAddress('seurafrancis99@gmail.com');     //Add a recipient            //Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'Mensaje de la casilla de contacto de la MEDi';
    
        //$file = fopen("Mail.html", "r");
        //$str = fread($file, filesize("Mail.html"));
        //$str = trim($str);
        //fclose($file);
    
        $mail->Body = '<div style="padding: 30px 0;">
        <img src="https://tinogasta.gob.ar/MEDi/assets/img/centro_de_reclamo_logon1.png" alt="Logo">
        <p style="color: #ff7832; font-weight: bold;">Has recibido un mensaje de la caja de Contacto de la Mesa de Entrada Digital MEDi</p>
        <h2>Asunto: '.$asunto.'</h2>
        <p>Enviado por '.$nombre.'</p>
        <p>Correo electrónico: '.$email.'</p>
    
        <p>Mensaje: </p>
        <p>'.$mensaje.'</p>
        </div>';
    
        $mail->send();
        echo json_encode(["success" => 1, "message" => "Correo Enviado Exitosamente"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Error al enviar el correo"]);
    }
}
?>
