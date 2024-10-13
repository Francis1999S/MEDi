<?php
// Acceso restringido al backend-
  $allowed_origin = "https://tinogasta.gob.ar";
  header("Access-Control-Allow-Origin: $allowed_origin");
// Acceso sin restricción al backend-
//    header("Access-Control-Allow-Origin: *");
//    header("Access-Control-Allow-Headers: access");
//    header("Access-Control-Allow-Methods: GET,POST");
//    header("Content-Type: application/json; charset=UTF-8");
//    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "j8000542_reclam"; $contrasenia = "01voMIgima"; $nombreBaseDatos = "j8000542_reclam";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Establecer la codificación de caracteres
mysqli_set_charset($conexionBD, "utf8mb4");

//Obtener_Todos_Reclamos
if (isset($_GET["Get_All_Reclamos"])) {
    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` ORDER BY id DESC;");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Reclamos_Pendientes"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = mysqli_query($conexionBD, "
        SELECT c.*, d.nombre_area 
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Pendiente'
        ORDER BY id DESC;
    ");
    
    // Obtenemos todos los resultados en formato asociativo
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    
    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Iniciados"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = mysqli_query($conexionBD, "
        SELECT c.*, d.nombre_area 
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Iniciado'
        ORDER BY id DESC;
    ");
    
    // Obtenemos todos los resultados en formato asociativo
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    
    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Demorados"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = mysqli_query($conexionBD, "
        SELECT c.*, d.nombre_area 
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Demorado'
        ORDER BY id DESC;
    ");
    
    // Obtenemos todos los resultados en formato asociativo
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    
    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Resueltos"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = mysqli_query($conexionBD, "
        SELECT c.*, d.nombre_area 
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Resuelto'
        ORDER BY id DESC;
    ");
    
    // Obtenemos todos los resultados en formato asociativo
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    
    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}


if (isset($_GET["Suma_Promedios_Areas"])) {
    // Consulta para obtener el promedio de contador_dias agrupados por destinacion donde estado es 'Resuelto'
    $sqlPromedio = $conexionBD->query("SELECT destinacion, ROUND(AVG(contador_dias), 2) as promedio_contador_dias 
                                       FROM comunicacion 
                                       WHERE estado = 'Resuelto' 
                                       GROUP BY destinacion");

    // Verificar si hay registros
    if ($sqlPromedio) {
        $resultados = [];
        
        // Recorrer los resultados
        while ($fila = $sqlPromedio->fetch_assoc()) {
            $resultados[] = [
                "destinacion" => $fila['destinacion'],
                "promedio_contador_dias" => $fila['promedio_contador_dias']
            ];
        }

        echo json_encode($resultados);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al obtener registros: " . $conexionBD->error]);
    }
    exit();
}


if (isset($_GET["Get_Area_Reclamos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE destinacion = '$clave_poder' ORDER BY id DESC;");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Antiguos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE destinacion = '$clave_poder';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Pendientes"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE estado = 'Pendiente' AND destinacion = '$clave_poder';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Iniciados"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE estado = 'Iniciado' AND destinacion = '$clave_poder';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Demorados"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE estado = 'Demorado' AND destinacion = '$clave_poder';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Resueltos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE estado = 'Resuelto' AND destinacion = '$clave_poder';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Usuarios"])) {
    // Consulta SQL con JOIN para obtener todos los usuarios y su nombre_area correspondiente
    $sqlUsuarios = mysqli_query($conexionBD, 
        "SELECT usuario.*, destinaciones.nombre_area 
         FROM usuario 
         LEFT JOIN destinaciones 
         ON usuario.clave_poder = destinaciones.clave_poder;"
    );
    
    // Obtener todos los resultados
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    
    // Convertir los datos a formato JSON y enviarlos como respuesta
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Areas"])) {
    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `destinaciones`;");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Areas_Select"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `destinaciones` WHERE clave_poder = '$clave_poder' LIMIT 1;");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if(isset($_GET["get_estadistica"])){
    $sqlUsuarios = mysqli_query($conexionBD, "SELECT SUM(pendientes) AS total_pendientes, SUM(iniciados) AS total_iniciados, SUM(demorados) AS total_demorados, SUM(resueltos) AS total_resueltos FROM destinaciones");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if(isset($_GET["Buscar_Con_Seguimiento"])){
    $data = json_decode(file_get_contents("php://input"));
    $seguimiento = mysqli_real_escape_string($conexionBD, $data->seguimiento);

   // $seguimiento=$data->seguimiento;

    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM `comunicacion` WHERE seguimiento = '$seguimiento' LIMIT 1;");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if(isset($_GET["delegar"])){
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $destinacion=$data->destinacion;
    $ID=$data->ID;
    // Verificar si alguno de los campos está vacío
    if (empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE comunicacion
        SET destinacion = '$destinacion'
        WHERE id = '$ID';";
        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Reenvio exitoso"]);
        } else {
            echo json_encode(["error" => "Error al reenviar: " . $conexionBD->error]);
        }
    }
}

if(isset($_GET["seguimiento"])){
    $data = json_decode(file_get_contents("php://input"));
    $seguimiento = mysqli_real_escape_string($conexionBD, $data->seguimiento);
    $cod_conf = mysqli_real_escape_string($conexionBD, $data->cod_conf);

    // $seguimiento=$data->seguimiento;
   //  $cod_conf=$data->cod_conf;
    // Verificar si alguno de los campos está vacío
    if (empty($cod_conf)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE `comunicacion` SET seguimiento = '$seguimiento' WHERE cod_conf = '$cod_conf'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Se ha insertado el codigo de seguimiento en una comunicacion"]);
        } else {
            echo json_encode(["error" => "Error al insertar el codigo de seguimiento: " . $conexionBD->error]);
        }
    }
}

if(isset($_GET["Modificar_Destinacion"])){
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;
    $nombre_area=$data->nombre_area;
    $descripcion=$data->descripcion;
    $email=$data->email;
    // Verificar si alguno de los campos está vacío
    if (empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE `destinaciones` SET nombre_area = '$nombre_area', descripcion = '$descripcion', email = '$email' WHERE clave_poder = '$clave_poder'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "El Area se ha modificado exitosamente"]);
        } else {
            echo json_encode(["error" => "Error al modificar el area: " . $conexionBD->error]);
        }
    }
}

if(isset($_GET["Marcar_Conformidad"])){
    $data = json_decode(file_get_contents("php://input"));
    $ID = mysqli_real_escape_string($conexionBD, $data->ID);
    $conforme = mysqli_real_escape_string($conexionBD, $data->conforme);
    $feedback = mysqli_real_escape_string($conexionBD, $data->feedback);

   // $ID=$data->ID;
   // $conforme=$data->conforme;
   // $feedback=$data->feedback;
    // Verificar si alguno de los campos está vacío
    if (empty($conforme)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE `comunicacion` SET conforme = '$conforme', feedback = '$feedback' WHERE id = '$ID'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Se ha insertado la conformidad exitosamente"]);
        } else {
            echo json_encode(["error" => "Error al insertar la conformidad: " . $conexionBD->error]);
        }
    }
}
//Inserta un nuevo registro
if(isset($_GET["insertar"])){
$fecha_actual = date('Y-m-d'); // Guarda la fecha en formato Año-Mes-Día
$hora_actual = date('H:i:s'); // Guarda la hora en formato Horas:Minutos:Segundos

    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON

    $caracter = mysqli_real_escape_string($conexionBD, $data->caracter);
    $titulo = mysqli_real_escape_string($conexionBD, $data->titulo);
    $descripcion = mysqli_real_escape_string($conexionBD, $data->descripcion);
    $ubicacion_1 = mysqli_real_escape_string($conexionBD, $data->ubicacion_1);
    $ubicacion_2 = mysqli_real_escape_string($conexionBD, $data->ubicacion_2);
    $destinacion = mysqli_real_escape_string($conexionBD, $data->destinacion);

        //////Personal Data//////
        $nombre = mysqli_real_escape_string($conexionBD, $data->nombre);
        $telefono = mysqli_real_escape_string($conexionBD, $data->telefono);
        $email = mysqli_real_escape_string($conexionBD, $data->email);
        $domicilio = mysqli_real_escape_string($conexionBD, $data->domicilio);

       ////Form Data/////
       $fecha = $fecha_actual;
       $hora = $hora_actual;
       $estado = mysqli_real_escape_string($conexionBD, $data->estado);
       $plazo_resolucion = mysqli_real_escape_string($conexionBD, $data->plazo_resolucion);
       $vencimientos = mysqli_real_escape_string($conexionBD, $data->vencimientos);
       $anonimo = mysqli_real_escape_string($conexionBD, $data->anonimo);
       $fecha_v = $fecha_actual;
       $cod_conf = mysqli_real_escape_string($conexionBD, $data->cod_conf);

   // $fecha=$data->fecha;
   // $hora=$data->hora;
   // $estado=$data->estado;
   // $plazo_resolucion=$data->plazo_resolucion;
   // $vencimientos=$data->vencimientos;
   // $anonimo=$data->anonimo;
   // $fecha_v=$data->fecha_v;
   // $cod_conf=$data->cod_conf;

    /////FilesUploaded////
    $file_1 = mysqli_real_escape_string($conexionBD, $data->file_1);
    $seguimiento = mysqli_real_escape_string($conexionBD, $data->seguimiento);

   // $file_1=$data->file_1;
   // $seguimiento=$data->seguimiento;
    // Verificar si alguno de los campos está vacío
    if (empty($caracter) || empty($titulo) || empty($descripcion) || empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "INSERT INTO comunicacion (caracter,
                titulo,
                descripcion,
                ubicacion_1,
                ubicacion_2,
                destinacion,
                nombre,
                telefono,
                email,
                domicilio,
                fecha,
                hora,
                estado,
                plazo_resolucion,
                vencimientos,
                anonimo,
                fecha_v,
                file_1,
                cod_conf,
                seguimiento) VALUES ('$caracter',
        '$titulo',
        '$descripcion',
        '$ubicacion_1',
        '$ubicacion_2',
        '$destinacion',
        '$nombre',
        '$telefono',
        '$email',
        '$domicilio',
        '$fecha',
        '$hora',
        '$estado',
        '$plazo_resolucion',
        '$vencimientos',
        '$anonimo',
        '$fecha_v',
        '$file_1',
        '$cod_conf',
        '$seguimiento')";
        if ($conexionBD->query($insert_sql) === TRUE) {
            $last_id = $conexionBD->insert_id;
                echo json_encode(["success" => 1, "message" => "Comunicacion Insertada Correctamente", "id" => $last_id]);
        } else {
            echo json_encode(["error" => "Error al insertar nueva comunicacion: " . $conexionBD->error]);
        }
    }
}
if(isset($_GET["Iniciar_Plazo_Vencimiento"])){
    $data = json_decode(file_get_contents("php://input"));
    $ID=$data->ID;
    $plazo_resolucion=$data->plazo_resolucion;
    // Verificar si alguno de los campos está vacío
    if (empty($ID)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE comunicacion SET fecha_v = DATE_ADD(CURDATE(), INTERVAL $plazo_resolucion DAY) WHERE id = $ID";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Se ha iniciado el plazo de vencimiento en una comunicacion"]);
        } else {
            echo json_encode(["error" => "Error al iniciar el plazo de vencimiento: " . $conexionBD->error]);
        }
    }
}
if(isset($_GET["cambio_color"])){
    $data = json_decode(file_get_contents("php://input"));
    $ID=$data->ID;
    $color=$data->color;
    // Verificar si alguno de los campos está vacío
    if (empty($ID)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE destinaciones SET color = $color WHERE id = '$ID'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Color cambiado"]);
        } else {
            echo json_encode(["error" => "Error al cambiar color: " . $conexionBD->error]);
        }
    }
}

if(isset($_GET["resta_pendientes"])){
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder=$data->clave_poder;
    // Verificar si alguno de los campos está vacío
    if (empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE destinaciones SET pendientes = pendientes - 1 WHERE clave_poder = '$clave_poder'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Restado 1 en Pendientes"]);
        } else {
            echo json_encode(["error" => "Error al restar 1 en Pendientes: " . $conexionBD->error]);
        }
    }
}

if(isset($_GET["suma_pendientes"])){
    $data = json_decode(file_get_contents("php://input"));
    $destinacion=$data->destinacion;
    // Verificar si alguno de los campos está vacío
    if (empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE destinaciones SET pendientes = pendientes + 1 WHERE clave_poder = '$destinacion'";

        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Sumado 1 en Iniciados"]);
        } else {
            echo json_encode(["error" => "Error al sumar 1 en Iniciados: " . $conexionBD->error]);
        }
    }
}

if (isset($_GET["Proceso_Confirmacion"])) {
    $data = json_decode(file_get_contents("php://input"));
    $cod_conf=$data->cod_conf;
    $estado=$data->estado;
    $sqlUsuarios = mysqli_query($conexionBD, "SELECT * FROM comunicacion WHERE cod_conf = '$cod_conf';");
    $usuarios = mysqli_fetch_all($sqlUsuarios, MYSQLI_ASSOC);
    echo json_encode($usuarios);
    exit();
}
if(isset($_GET["Cambio_Estado_Comunicacion"])){
    $data = json_decode(file_get_contents("php://input"));
    $estado=$data->estado;
    $col_dest_before=$data->col_dest_before;
    $col_dest_now=$data->col_dest_now;
    $clave_poder=$data->clave_poder;
    $ID=$data->ID;
    $comentario=$data->comentario;
    $fecha_r=$data->fecha_r;
    // Verificar si alguno de los campos está vacío
    if (empty($estado)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {

        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "UPDATE comunicacion SET estado = '$estado' WHERE id = '$ID'";
        if ($conexionBD->query($insert_sql) === TRUE) {
            $insert_sql_2 = "UPDATE destinaciones SET $col_dest_before = $col_dest_before - 1, $col_dest_now = $col_dest_now + 1 WHERE clave_poder = '$clave_poder'";
            if ($conexionBD->query($insert_sql_2) === TRUE){
                if (!empty($comentario)) {
                    $insert_sql_3 = "UPDATE comunicacion SET comentario = '$comentario', fecha_r = '$fecha_r' WHERE id = '$ID'";
                    if ($conexionBD->query($insert_sql_3) === TRUE){
                        echo json_encode(["success" => 1, "message" => "comentario y fecha_r insertados exitosamente"]);
                    } else {
                        echo json_encode(["error" => "Error al insertar comentario y fecha_r: " . $conexionBD->error]);
                    }
                }
            } else {
                echo json_encode(["error" => "Error al cambiar estado de comunicacion: " . $conexionBD->error]);
            }
        } else {
            echo json_encode(["error" => "Error al cambiar estado de comunicacion: " . $conexionBD->error]);
        }
    }
}
//Inserta un nuevo registro
if(isset($_GET["insertar_destinacion"])){
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $nombre_area=$data->nombre_area;
    $descripcion=$data->descripcion;
    $clave_poder=$data->clave_poder;
    $iniciados=$data->iniciados;
    $resueltos=$data->resueltos;
    $demorados=$data->demorados;
    $eliminados=$data->eliminados;
    $email=$data->email;
    // Verificar si alguno de los campos está vacío
    if (empty($nombre_area) || empty($descripcion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "INSERT INTO destinaciones (nombre_area,
                descripcion, clave_poder, iniciados, resueltos, demorados, eliminados, email) VALUES ('$nombre_area',
        '$descripcion', '$clave_poder', '$iniciados', '$resueltos', '$demorados', '$eliminados', '$email')";
        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Nueva destinacion insertada"]);
        } else {
            echo json_encode(["error" => "Error al insertar nueva destinacion: " . $conexionBD->error]);
        }
    }
}
if(isset($_GET["insertar_cuenta_usuario"])){
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $user=$data->user;
    $pass=$data->pass;
    $clave_poder=$data->clave_poder;
    $nombre=$data->nombre;
    $rol=$data->rol;
    // Verificar si alguno de los campos está vacío
    if (empty($user) || empty($pass) || empty($nombre) || empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = "INSERT INTO usuario (user,
                pass,
                clave_poder,
                nombre,
                rol) VALUES ('$user',
        '$pass',
        '$clave_poder',
        '$nombre',
        '$rol')";
        if ($conexionBD->query($insert_sql) === TRUE) {
            echo json_encode(["success" => 1, "message" => "Nuevo usuario insertado"]);
        } else {
            echo json_encode(["error" => "Error al insertar nuevo usuario: " . $conexionBD->error]);
        }
    }
}

// Cerrar conexión
$conexionBD->close();

?>