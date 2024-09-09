export class Credenciales {
    user!:string;
    pass!:string;
}
export class Cambio_Color {
    ID!:string;
    color!:string;
}
export class Conformidad {
    ID!:string;
    conforme!:string;
    feedback!:string;
}
export class Seguimiento {
    cod_conf!:string;
    seguimiento!:string;
}
export class Verificacion {
    codigo_verif!:string;
}
export class Contacto {
    nombre!:string;
    email!:string;
    asunto!:string;
    mensaje!:string;
}
export class Confirmacion_Private_Form {
    cod_conf!:string;
    estado!:string;
}
export class Codigo_Area {
    destinacion!:string;
    ID!:string;
}
export class Declarar_Plazo_V {
    plazo_resolucion!:string;
    ID!:string;
}
export class Cambio_Estado_Comunicacion {
    clave_poder!:string;
    estado!:string;
    col_dest_before!: string;
    col_dest_now!:string;
    ID!:string;
    comentario!: string;
    fecha_r!: string;
}
export class Reclamo {
    caracter!:string;
    titulo!:string;
    descripcion!:string;
    ubicacion_1!:string;
    ubicacion_2!:string;
    destinacion!:string;
    //////Personal Data//////
    nombre!:string;
    telefono!:string;
    email!:string;
    email_d!:string;
    domicilio!:string;
    ////Form Data/////
    fecha!:string;
    hora!:string;
    estado!:string;
    plazo_resolucion!:string;
    vencimientos!:string;
    anonimo!: string;
    fecha_v!: string;
    file_1!: string;
    cod_conf!: string;
    comentario!: string;
    fecha_r!: string;
    conforme!: string;
    feedback!: string;
}
export class Destinacion {
    nombre_area!:string;
    descripcion!:string;
    iniciados!:number;
    demorados!:number;
    resueltos!:number;
    eliminados!:number;
    email!:string;
}
export class Cuenta_Usuario {
    user!:string;
    pass!:string;
    clave_poder!:string;
    nombre!:string;
    rol!:string;
}
export class Clave_Poder{
    clave_poder!:string;
}
export class Modificar_Area{
    clave_poder!:string;
    nombre_area!:string;
    descripcion!:string;
    email!:string;
}