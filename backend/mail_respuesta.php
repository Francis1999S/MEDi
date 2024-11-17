<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $data = json_decode(file_get_contents("php://input"));
    $email=$data->email;
    $seguimiento=$data->seguimiento;
    $titulo=$data->titulo;
    $mensaje=$data->mensaje;

 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\SMTP;
 use PHPMailer\PHPMailer\Exception;
 
 //Load Composer's autoloaderng
 require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

if (empty($email)) {
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
        $mail->setFrom('info@tinogasta.gob.ar', 'MEDi - E-Mail');
        $mail->addAddress($email);     //Add a recipient            //Name is optional
        //$mail->addReplyTo('info@example.com', 'Information');
        //$mail->addCC('cc@example.com');
        //$mail->addBCC('bcc@example.com');
    
        //Attachments
        //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
    
        //Content
        $mail->isHTML(true);                                  //Set email format to HTML
        $mail->Subject = 'MEDi - Comunicacion';
    
        //$file = fopen("Mail.html", "r");
        //$str = fread($file, filesize("Mail.html"));
        //$str = trim($str);
        //fclose($file);
    
        $mail->Body = '<div style="padding: 30px 0 0 0; background: white;">
        <img src="https://tinogasta.gob.ar/MEDi/assets/img/centro_de_reclamo_logon1.png" alt="Logo">
        <h1 style="color: #ff7832; font-weight: bold; font-size: 130%;">'.$titulo.'</h1><br>
        <p style="color: #ff7832;">'.$mensaje.'</p><br>

        <p style="color: #ff7832;">Haz el seguimiento ahora con tu codigo: '.$seguimiento.'</p><br><br>

           <a href="https://Tinogasta.gob.ar/MEDi/#/Seguimiento/'.$seguimiento.'" style="
   background-color: rgb(255,120,50);
   color: white;
   text-decoration: none;
   font-weight: bold;
   padding: 15px;
   ">Abrir Seguimiento ➚</a> <br> <br>

    <p style="color: #ff7832;">O dirigete a -> medi.tinogasta.gob.ar</p>
        </div>';
    
        $mail->send();
        echo json_encode(["success" => 1, "message" => "Correo Enviado Exitosamente"]);
    } catch (Exception $e) {
        echo json_encode(["error" => "Error al enviar el correo"]);
    }
}
?>
