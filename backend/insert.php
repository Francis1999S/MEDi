<?php
// Acceso restringido al backend-
//  $allowed_origin = "https://tinogasta.gob.ar";
//  header("Access-Control-Allow-Origin: $allowed_origin");
// Acceso sin restricción al backend-
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/db.php';
$conexionBD = medi_conectar();

//Obtener_Todos_Reclamos
if (isset($_GET["Get_All_Reclamos"])) {
    $sqlUsuarios = $conexionBD->query("SELECT * FROM comunicacion ORDER BY id DESC;");
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_All_Reclamos_2"])) {
    $sqlUsuarios = $conexionBD->query("
   SELECT c.*, d.nombre_area
   FROM comunicacion c
   JOIN destinaciones d ON c.destinacion = d.clave_poder
   ORDER BY id DESC;
");

    // Obtenemos todos los resultados en formato asociativo
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Reclamos_Pendientes"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = $conexionBD->query("
        SELECT c.*, d.nombre_area
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Pendiente'
        ORDER BY id DESC;
    ");

    // Obtenemos todos los resultados en formato asociativo
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Iniciados"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = $conexionBD->query("
        SELECT c.*, d.nombre_area
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Iniciado'
        ORDER BY id DESC;
    ");

    // Obtenemos todos los resultados en formato asociativo
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Demorados"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = $conexionBD->query("
        SELECT c.*, d.nombre_area
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Demorado'
        ORDER BY id DESC;
    ");

    // Obtenemos todos los resultados en formato asociativo
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Reclamos_Resueltos"])) {
    // Consulta SQL que obtiene los registros pendientes y el nombre del área correspondiente
    $sqlUsuarios = $conexionBD->query("
        SELECT c.*, d.nombre_area
        FROM comunicacion c
        JOIN destinaciones d ON c.destinacion = d.clave_poder
        WHERE c.estado = 'Resuelto'
        ORDER BY id DESC;
    ");

    // Obtenemos todos los resultados en formato asociativo
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertimos el resultado en formato JSON y lo mostramos
    echo json_encode($usuarios);
    exit();
}


if (isset($_GET["Suma_Promedios_Areas"])) {
    // Consulta para obtener los promedios agrupados por destinación
    $sqlPromedio = $conexionBD->query("
        SELECT
            destinacion,
            ROUND(AVG(CASE WHEN estado = 'Resuelto' THEN contador_dias END), 2) AS promedio_contador_dias_resuelto,
            ROUND(AVG(CASE WHEN estado IN ('Pendiente', 'Iniciado') THEN contador_dias_p END), 2) AS promedio_contador_dias_p,
            ROUND(AVG(contador_dias), 2) AS promedio_general
        FROM comunicacion
        GROUP BY destinacion
    ");

    // Verificar si hay registros
    if ($sqlPromedio) {
        $resultados = [];

        // Recorrer los resultados
        while ($fila = $sqlPromedio->fetch()) {
            $resultados[] = [
                "destinacion" => $fila['destinacion'],
                "promedio_contador_dias_resuelto" => $fila['promedio_contador_dias_resuelto'],
                "promedio_contador_dias_p" => $fila['promedio_contador_dias_p'],
                "promedio_general" => $fila['promedio_general']
            ];
        }

        echo json_encode($resultados);
    } else {
        echo json_encode(["success" => 0, "message" => "Error al obtener registros"]);
    }
    exit();
}



if (isset($_GET["Get_Area_Reclamos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE destinacion = :clave_poder ORDER BY id DESC;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Antiguos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE destinacion = :clave_poder;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Pendientes"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE estado = 'Pendiente' AND destinacion = :clave_poder;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Iniciados"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE estado = 'Iniciado' AND destinacion = :clave_poder;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Demorados"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE estado = 'Demorado' AND destinacion = :clave_poder;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Get_Resueltos"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE estado = 'Resuelto' AND destinacion = :clave_poder;");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Usuarios"])) {
    // Consulta SQL con JOIN para obtener todos los usuarios y su nombre_area correspondiente
    $sqlUsuarios = $conexionBD->query(
        "SELECT usuario.*, destinaciones.nombre_area
         FROM usuario
         LEFT JOIN destinaciones
         ON usuario.clave_poder = destinaciones.clave_poder;"
    );

    // Obtener todos los resultados
    $usuarios = $sqlUsuarios->fetchAll();

    // Convertir los datos a formato JSON y enviarlos como respuesta
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["Get_Areas"])) {
    $sqlUsuarios = $conexionBD->query("
        SELECT
            d.*,
            u.*,
            c.destinacion,
            SUM(CASE WHEN c.estado = 'Pendiente' THEN 1 ELSE 0 END) AS total_pendientes,
            SUM(CASE WHEN c.estado = 'Iniciado' THEN 1 ELSE 0 END) AS total_iniciados,
            SUM(CASE WHEN c.estado = 'Demorado' THEN 1 ELSE 0 END) AS total_demorados,
            SUM(CASE WHEN c.estado = 'Resuelto' THEN 1 ELSE 0 END) AS total_resueltos
        FROM destinaciones AS d
        LEFT JOIN usuario AS u ON d.clave_poder = u.clave_poder
        LEFT JOIN comunicacion AS c ON d.clave_poder = c.destinacion
        GROUP BY d.id, u.id, c.destinacion
    ");

    // Obtener los resultados
    $usuarios = $sqlUsuarios->fetchAll();

    // Enviar como JSON
    echo json_encode($usuarios);
    exit();
}



if (isset($_GET["Get_Areas_Select"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;
    $sqlUsuarios = $conexionBD->prepare("
        SELECT
            d.*,
            SUM(CASE WHEN c.estado = 'Pendiente' THEN 1 ELSE 0 END) AS total_pendientes,
            SUM(CASE WHEN c.estado = 'Iniciado' THEN 1 ELSE 0 END) AS total_iniciados,
            SUM(CASE WHEN c.estado = 'Demorado' THEN 1 ELSE 0 END) AS total_demorados,
            SUM(CASE WHEN c.estado = 'Resuelto' THEN 1 ELSE 0 END) AS total_resueltos
        FROM destinaciones AS d
        LEFT JOIN comunicacion AS c ON d.clave_poder = c.destinacion
        WHERE d.clave_poder = :clave_poder
        GROUP BY d.id
        LIMIT 1;
    ");
    $sqlUsuarios->execute([':clave_poder' => $clave_poder]);

    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}

if (isset($_GET["get_estadistica"])) {
    $sqlUsuarios = $conexionBD->query("
        SELECT estados.estado, COUNT(comunicacion.estado) AS total
        FROM (SELECT 'Pendiente' AS estado
              UNION ALL
              SELECT 'Iniciado'
              UNION ALL
              SELECT 'Demorado'
              UNION ALL
              SELECT 'Resuelto') AS estados
        LEFT JOIN comunicacion ON comunicacion.estado = estados.estado
        GROUP BY estados.estado
    ");

    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}


if (isset($_GET["Buscar_Con_Seguimiento"])) {
    $data = json_decode(file_get_contents("php://input"));
    $seguimiento = $data->seguimiento;

    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE seguimiento = :seguimiento LIMIT 1;");
    $sqlUsuarios->execute([':seguimiento' => $seguimiento]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["delegar"])) {
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $destinacion = $data->destinacion;
    $ID = $data->ID;
    // Verificar si alguno de los campos está vacío
    if (empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE comunicacion SET destinacion = :destinacion WHERE id = :id;");
            $insert_sql->execute([':destinacion' => $destinacion, ':id' => $ID]);
            echo json_encode(["success" => 1, "message" => "Reenvio exitoso"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al reenviar: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["seguimiento"])) {
    $data = json_decode(file_get_contents("php://input"));
    $seguimiento = $data->seguimiento;
    $cod_conf = $data->cod_conf;

    // Verificar si alguno de los campos está vacío
    if (empty($cod_conf)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE comunicacion SET seguimiento = :seguimiento WHERE cod_conf = :cod_conf");
            $insert_sql->execute([':seguimiento' => $seguimiento, ':cod_conf' => $cod_conf]);
            echo json_encode(["success" => 1, "message" => "Se ha insertado el codigo de seguimiento en una comunicacion"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al insertar el codigo de seguimiento: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["Modificar_Destinacion"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;
    $nombre_area = $data->nombre_area;
    $descripcion = $data->descripcion;
    $nombre_responsable = $data->nombre_responsable;
    $operador = $data->nombre_operador;
    $email = $data->email;
    // Verificar si alguno de los campos está vacío
    if (empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE destinaciones SET nombre_area = :nombre_area, descripcion = :descripcion, email = :email WHERE clave_poder = :clave_poder");
            $insert_sql->execute([
                ':nombre_area' => $nombre_area,
                ':descripcion' => $descripcion,
                ':email' => $email,
                ':clave_poder' => $clave_poder,
            ]);

            $insert_sql_2 = $conexionBD->prepare('UPDATE usuario SET nombre = :nombre, operador = :operador WHERE clave_poder = :clave_poder');
            $insert_sql_2->execute([
                ':nombre' => $nombre_responsable,
                ':operador' => $operador,
                ':clave_poder' => $clave_poder,
            ]);

            echo json_encode(["success" => 1, "message" => "El Area se ha modificado exitosamente"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al modificar el area: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["Marcar_Conformidad"])) {
    $data = json_decode(file_get_contents("php://input"));
    $ID = $data->ID;
    $conforme = $data->conforme;
    $feedback = $data->feedback;

    // Verificar si alguno de los campos está vacío
    if (empty($conforme)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE comunicacion SET conforme = :conforme, feedback = :feedback WHERE id = :id");
            $insert_sql->execute([':conforme' => $conforme, ':feedback' => $feedback, ':id' => $ID]);
            echo json_encode(["success" => 1, "message" => "Se ha insertado la conformidad exitosamente"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al insertar la conformidad: " . $e->getMessage()]);
        }
    }
}
//Inserta un nuevo registro
if (isset($_GET["insertar"])) {
    $fecha_actual = date('Y-m-d'); // Guarda la fecha en formato Año-Mes-Día
    $hora_actual = date('H:i:s'); // Guarda la hora en formato Horas:Minutos:Segundos

    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON

    $caracter = $data->caracter;
    $titulo = $data->titulo;
    $descripcion = $data->descripcion;
    $ubicacion_1 = $data->ubicacion_1;
    $ubicacion_2 = $data->ubicacion_2;
    $destinacion = $data->destinacion;

    //////Personal Data//////
    $nombre = $data->nombre;
    $telefono = $data->telefono;
    $email = $data->email;
    $domicilio = $data->domicilio;

    ////Form Data/////
    $fecha = $fecha_actual;
    $hora = $hora_actual;
    $estado = $data->estado;
    $plazo_resolucion = $data->plazo_resolucion;
    $vencimientos = $data->vencimientos;
    // La columna "anonimo" es booleana en PostgreSQL
    $anonimo = filter_var($data->anonimo, FILTER_VALIDATE_BOOLEAN) ? 'true' : 'false';
    $fecha_v = $fecha_actual;
    $cod_conf = $data->cod_conf;

    /////FilesUploaded////
    $file_1 = $data->file_1;
    $seguimiento = $data->seguimiento;

    // Verificar si alguno de los campos está vacío
    if (empty($caracter) || empty($titulo) || empty($descripcion) || empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        $insert_sql = $conexionBD->prepare("INSERT INTO comunicacion (caracter,
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
                seguimiento) VALUES (:caracter,
        :titulo,
        :descripcion,
        :ubicacion_1,
        :ubicacion_2,
        :destinacion,
        :nombre,
        :telefono,
        :email,
        :domicilio,
        :fecha,
        :hora,
        :estado,
        :plazo_resolucion,
        :vencimientos,
        :anonimo,
        :fecha_v,
        :file_1,
        :cod_conf,
        :seguimiento) RETURNING id");
        try {
            $insert_sql->execute([
                ':caracter' => $caracter,
                ':titulo' => $titulo,
                ':descripcion' => $descripcion,
                ':ubicacion_1' => $ubicacion_1,
                ':ubicacion_2' => $ubicacion_2,
                ':destinacion' => $destinacion,
                ':nombre' => $nombre,
                ':telefono' => $telefono,
                ':email' => $email,
                ':domicilio' => $domicilio,
                ':fecha' => $fecha,
                ':hora' => $hora,
                ':estado' => $estado,
                ':plazo_resolucion' => $plazo_resolucion,
                ':vencimientos' => $vencimientos,
                ':anonimo' => $anonimo,
                ':fecha_v' => $fecha_v,
                ':file_1' => $file_1,
                ':cod_conf' => $cod_conf,
                ':seguimiento' => $seguimiento,
            ]);
            $last_id = $insert_sql->fetchColumn();
            echo json_encode(["success" => 1, "message" => "Comunicacion Insertada Correctamente", "id" => $last_id]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al insertar nueva comunicacion: " . $e->getMessage()]);
        }
    }
}
if (isset($_GET["Iniciar_Plazo_Vencimiento"])) {
    $data = json_decode(file_get_contents("php://input"));
    $ID = $data->ID;
    $plazo_resolucion = $data->plazo_resolucion;
    // Verificar si alguno de los campos está vacío
    if (empty($ID)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE comunicacion SET fecha_v = CURRENT_DATE + (:plazo_resolucion || ' days')::interval WHERE id = :id");
            $insert_sql->execute([':plazo_resolucion' => $plazo_resolucion, ':id' => $ID]);
            echo json_encode(["success" => 1, "message" => "Se ha iniciado el plazo de vencimiento en una comunicacion"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al iniciar el plazo de vencimiento: " . $e->getMessage()]);
        }
    }
}
if (isset($_GET["cambio_color"])) {
    $data = json_decode(file_get_contents("php://input"));
    $ID = $data->ID;
    $color = $data->color;
    // Verificar si alguno de los campos está vacío
    if (empty($ID)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE destinaciones SET color = :color WHERE id = :id");
            $insert_sql->execute([':color' => $color, ':id' => $ID]);
            echo json_encode(["success" => 1, "message" => "Color cambiado"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al cambiar color: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["resta_pendientes"])) {
    $data = json_decode(file_get_contents("php://input"));
    $clave_poder = $data->clave_poder;
    // Verificar si alguno de los campos está vacío
    if (empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE destinaciones SET pendientes = pendientes - 1 WHERE clave_poder = :clave_poder");
            $insert_sql->execute([':clave_poder' => $clave_poder]);
            echo json_encode(["success" => 1, "message" => "Restado 1 en Pendientes"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al restar 1 en Pendientes: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["suma_pendientes"])) {
    $data = json_decode(file_get_contents("php://input"));
    $destinacion = $data->destinacion;
    // Verificar si alguno de los campos está vacío
    if (empty($destinacion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la actualización en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("UPDATE destinaciones SET pendientes = pendientes + 1 WHERE clave_poder = :destinacion");
            $insert_sql->execute([':destinacion' => $destinacion]);
            echo json_encode(["success" => 1, "message" => "Sumado 1 en Iniciados"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al sumar 1 en Iniciados: " . $e->getMessage()]);
        }
    }
}

if (isset($_GET["Proceso_Confirmacion"])) {
    $data = json_decode(file_get_contents("php://input"));
    $cod_conf = $data->cod_conf;
    $estado = $data->estado;
    $sqlUsuarios = $conexionBD->prepare("SELECT * FROM comunicacion WHERE cod_conf = :cod_conf;");
    $sqlUsuarios->execute([':cod_conf' => $cod_conf]);
    $usuarios = $sqlUsuarios->fetchAll();
    echo json_encode($usuarios);
    exit();
}
if (isset($_GET["Cambio_Estado_Comunicacion"])) {
    $data = json_decode(file_get_contents("php://input"));
    $estado = $data->estado;
    $col_dest_before = $data->col_dest_before;
    $col_dest_now = $data->col_dest_now;
    $clave_poder = $data->clave_poder;
    $ID = $data->ID;
    $comentario = $data->comentario;
    $fecha_r = $data->fecha_r;

    // Las columnas a incrementar/decrementar vienen del cliente: se validan contra
    // una lista blanca antes de usarlas como identificadores en el SQL, ya que un
    // identificador de columna no puede parametrizarse con marcadores de posición.
    $columnasPermitidas = ['pendientes', 'iniciados', 'demorados', 'resueltos', 'eliminados'];

    // Verificar si alguno de los campos está vacío
    if (empty($estado)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } elseif (!in_array($col_dest_before, $columnasPermitidas, true) || !in_array($col_dest_now, $columnasPermitidas, true)) {
        echo json_encode(["error" => "Error: columna de destinación inválida"]);
    } else {
        try {
            $insert_sql = $conexionBD->prepare("UPDATE comunicacion SET estado = :estado WHERE id = :id");
            $insert_sql->execute([':estado' => $estado, ':id' => $ID]);

            $insert_sql_2 = $conexionBD->prepare("UPDATE destinaciones SET \"$col_dest_before\" = \"$col_dest_before\" - 1, \"$col_dest_now\" = \"$col_dest_now\" + 1 WHERE clave_poder = :clave_poder");
            $insert_sql_2->execute([':clave_poder' => $clave_poder]);

            if (!empty($comentario)) {
                $insert_sql_3 = $conexionBD->prepare("UPDATE comunicacion SET comentario = :comentario, fecha_r = :fecha_r WHERE id = :id");
                $insert_sql_3->execute([':comentario' => $comentario, ':fecha_r' => $fecha_r, ':id' => $ID]);
                echo json_encode(["success" => 1, "message" => "comentario y fecha_r insertados exitosamente"]);
            }
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al cambiar estado de comunicacion: " . $e->getMessage()]);
        }
    }
}
//Inserta un nuevo registro
if (isset($_GET["insertar_destinacion"])) {
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $nombre_area = $data->nombre_area;
    $descripcion = $data->descripcion;
    $clave_poder = $data->clave_poder;
    $iniciados = $data->iniciados;
    $resueltos = $data->resueltos;
    $demorados = $data->demorados;
    $eliminados = $data->eliminados;
    $email = $data->email;
    // Verificar si alguno de los campos está vacío
    if (empty($nombre_area) || empty($descripcion)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        try {
            $insert_sql = $conexionBD->prepare("INSERT INTO destinaciones (nombre_area,
                descripcion, clave_poder, iniciados, resueltos, demorados, eliminados, email) VALUES (:nombre_area,
        :descripcion, :clave_poder, :iniciados, :resueltos, :demorados, :eliminados, :email)");
            $insert_sql->execute([
                ':nombre_area' => $nombre_area,
                ':descripcion' => $descripcion,
                ':clave_poder' => $clave_poder,
                ':iniciados' => $iniciados,
                ':resueltos' => $resueltos,
                ':demorados' => $demorados,
                ':eliminados' => $eliminados,
                ':email' => $email,
            ]);
            echo json_encode(["success" => 1, "message" => "Nueva destinacion insertada"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al insertar nueva destinacion: " . $e->getMessage()]);
        }
    }
}
if (isset($_GET["insertar_cuenta_usuario"])) {
    $data = json_decode(file_get_contents("php://input"));
    // Obtener los datos del objeto JSON
    $user = $data->user;
    $pass = $data->pass;
    $clave_poder = $data->clave_poder;
    $nombre = $data->nombre;
    $operador = $data->operador;
    $rol = $data->rol;
    // Verificar si alguno de los campos está vacío
    if (empty($user) || empty($pass) || empty($nombre) || empty($clave_poder)) {
        // Devolver un mensaje de error si algún campo está vacío
        echo json_encode(["error" => "Error: Todos los campos son obligatorios"]);
    } else {
        // Si todos los campos tienen valores, realizar la inserción en la base de datos
        try {
            $insert_sql = $conexionBD->prepare('INSERT INTO usuario ("user",
                pass,
                clave_poder,
                nombre,
                operador,
                rol) VALUES (:user,
        :pass,
        :clave_poder,
        :nombre,
        :operador,
        :rol)');
            $insert_sql->execute([
                ':user' => $user,
                ':pass' => $pass,
                ':clave_poder' => $clave_poder,
                ':nombre' => $nombre,
                ':operador' => $operador,
                ':rol' => $rol,
            ]);
            echo json_encode(["success" => 1, "message" => "Nuevo usuario insertado"]);
        } catch (PDOException $e) {
            echo json_encode(["error" => "Error al insertar nuevo usuario: " . $e->getMessage()]);
        }
    }
}

?>
