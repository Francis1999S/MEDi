<?php
 header("Access-Control-Allow-Origin: *");
 header("Access-Control-Allow-Headers: access");
 header("Access-Control-Allow-Methods: GET,POST");
 header("Content-Type: application/json; charset=UTF-8");
 header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    $data = json_decode(file_get_contents("php://input"));
    $caracter=$data->caracter;
    $titulo=$data->titulo;
    $descripcion=$data->descripcion;
    $ubicacion_1=$data->ubicacion_1;
    $ubicacion_2=$data->ubicacion_2;
    $destinacion=$data->destinacion;
        //////Personal Data//////
    $nombre=$data->nombre;
    $telefono=$data->telefono;
    $email=$data->email;
    $email_d=$data->email_d;
    $domicilio=$data->domicilio;
       ////Form Data/////
    $fecha=$data->fecha;
    $hora=$data->hora;
    $estado=$data->estado;
    $plazo_resolucion=$data->plazo_resolucion;
    $vencimientos=$data->vencimientos;
    $anonimo=$data->anonimo;
    $fecha_v=$data->fecha_v;
    $file_1=$data->file_1;
    $cod_conf=$data->cod_conf;

 use PHPMailer\PHPMailer\PHPMailer;
 use PHPMailer\PHPMailer\SMTP;
 use PHPMailer\PHPMailer\Exception;
 
 //Load Composer's autoloaderng
 require 'vendor/autoload.php';

//Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);

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
    $mail->setFrom('info@tinogasta.gob.ar', 'MEDi');
    $mail->addAddress($email_d);     //Add a recipient            //Name is optional
    //$mail->addReplyTo('info@example.com', 'Information');
    //$mail->addCC('cc@example.com');
    //$mail->addBCC('bcc@example.com');

    //Attachments
    //$mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
    //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

    //Content
    $mail->isHTML(true);                                  //Set email format to HTML
    $mail->Subject = 'Notificacion de la MEDi';

    //$file = fopen("Mail.html", "r");
    //$str = fread($file, filesize("Mail.html"));
    //$str = trim($str);
    //fclose($file);
    if ($file_1 === '*NINGUNO*') {
        $mail->Body = '<div style="padding: 30px 0;">
        <img src="https://tinogasta.gob.ar/MEDi/assets/img/centro_de_reclamo_logon1.png" alt="Logo">
        <p style="color: #ff7832; font-weight: bold;">Su área ha recibido una nueva comunicación. Por favor, diríjase al panel de administración para ver más detalles.</p><br>
      
        <h2>'.$caracter.': '.$titulo.'</h2>
        <p>Iniciado el '.$fecha.' a las '.$hora.' Hs</p>
        <p>Ciudad: Tinogasta</p>
        <p>Carácter: '.$caracter.'</p>
        <p>Asunto: '.$titulo.'</p>
        <p>Plazo de Resolución: '.$plazo_resolucion.' días</p>
        <p>Próximo Vencimiento: '.$fecha_v.'</p>
        <p>Descripción: '.$descripcion.'</p>
        <p>Ubicación: '.$ubicacion_1.'</p><br><br>
        <a href="https://Tinogasta.gob.ar/MEDi/#/Confirmar-Comunicacion/'.$cod_conf.'">CONFIRMAR COMUNICACIÓN</a><br><br><br>
        <a href="https://Tinogasta.gob.ar/MEDi/#/LogIn" target="_blank">PANEL DE ADMINISTRACIÓN</a>
        </div>';
    } else {
        $mail->Body = '<div style="padding: 30px 0;">
        <img src="https://tinogasta.gob.ar/MEDi/assets/img/centro_de_reclamo_logon1.png" alt="Logo">
        <p style="color: #ff7832; font-weight: bold;">Su área ha recibido una nueva comunicación. Por favor, diríjase al panel de administración para ver más detalles.</p><br>
      
        <h2>'.$caracter.': '.$titulo.'</h2>
        <p>Iniciado el '.$fecha.' a las '.$hora.' Hs</p>
        <p>Ciudad: Tinogasta</p>
        <p>Carácter: '.$caracter.'</p>
        <p>Asunto: '.$titulo.'</p>
        <p>Plazo de Resolución: '.$plazo_resolucion.' días</p>
        <p>Próximo Vencimiento: '.$fecha_v.'</p>
        <p>Descripción: '.$descripcion.'</p>
        <p>Ubicación: '.$ubicacion_1.'</p>
        <a href="'.$file_1.'">Archivo Adjunto ➙ '.$file_1.'</a><br><br><br>
        <a href="https://Tinogasta.gob.ar/MEDi/#/Confirmar-Comunicacion/'.$cod_conf.'">CONFIRMAR COMUNICACIÓN</a><br><br><br>
        <a href="https://Tinogasta.gob.ar/MEDi/#/LogIn" target="_blank">PANEL DE ADMINISTRACIÓN</a>
        </div>';
    }
   

    $mail->send();
    echo json_encode(["success" => 1, "message" => "Correo Enviado Exitosamente"]);
} catch (Exception $e) {
    echo json_encode(["error" => "Error al enviar el correo"]);
}
?>
