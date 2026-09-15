import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credenciales, Reclamo, Destinacion, Cuenta_Usuario, Clave_Poder, Codigo_Area, Cambio_Estado_Comunicacion, Confirmacion_Private_Form, Declarar_Plazo_V, Contacto, Seguimiento, Verificacion, Conformidad, Cambio_Color, Modificar_Area } from './objetos';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /////////////////Clave_Poder para Modificacion////////////////
  Clave_Poder_Modificacion: string = '';
  /////////////////Coordenadas Mapa///////////////////
  Latitud: number = 0;
  Longitud: number = 0;
  /////////////////Coordenadas Mapa///////////////////
  ///////////////Estadísticas-Admin///////////////////
  Pendientes: number = 0;
  Iniciados: number = 0;
  Demorados: number = 0;
  Resueltos: number = 0;
  ///////////////Estadísticas-Admin/////////////////
  //////////////Clave-Poder//////////////
  Clave_Poder: any;
  /////////////Clave-Poder//////////////
  User_Name: string = '';
  User_Save: string = '';
  User_Rol: string = '';
  coordenadas_map: any;
  LogIn_1: boolean = false;
  LogIn_2: boolean = false;
  LogIn_3: boolean = false;

  RESPONSABLE_NAME: string = '';
  OPERATOR_NAME: string = '';

  apiUrl: string = 'https://medi-flame-kappa.vercel.app/backend/';
  constructor(private http: HttpClient) { }
  //-------------------METODOS DE SESION "LOGIN" (START)--------------------
  LogIn1(data: Credenciales): Observable<any> {
    return this.http.post(this.apiUrl + "credenciales.php?login_1=1", data);
  }
  LogIn2(data: Credenciales): Observable<any> {
    return this.http.post(this.apiUrl + "credenciales.php?login_2=1", data);
  }
  //-------------------METODOS DE SESION "LOGIN" (END)--------------------

  //-------------------METODOS INSERT RECLAMOS "HOME" (START)--------------------
  InsertNewReclam(data: Reclamo): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?insertar=1", data);
  }
  AddStatistics(data: Reclamo): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?suma_pendientes=1", data);
  }
  Insertar_Cod_Seguimiento(data: Seguimiento): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?seguimiento=1", data);
  }
  //-------------------METODOS INSERT RECLAMOS "HOME" (END)--------------------

  //-------------------METODO DELEGACION DE RECLAMOS (START)--------------------
  DelegateClaim(data: Codigo_Area): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?delegar=1", data);
  }
  //-------------------METODO DELEGACION DE RECLAMOS (END)-----------------------

  //-------------------METODOS GET RECLAMOS "ADMIN-HOME" (START)--------------------
  GetAllReclamos(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?Get_All_Reclamos=1");
  }
  GetAllReclamos2(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?Get_All_Reclamos_2=1");
  }
  GetAreaReclamos(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Area_Reclamos=1", data);
  }
  GetAntiguos(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Antiguos=1", data);
  }
  GetPendientes(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Pendientes=1", data);
  }
  GetIniciados(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Iniciados=1", data);
  }
  GetDemorados(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Demorados=1", data);
  }
  GetResueltos(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Resueltos=1", data);
  }

  //-------------------METODOS GET RECLAMOS "ADMIN-HOME" (END)--------------------

  //-------------------METODOS SEGUIMIENTOS "SEGUIMIENTOS" (START)--------------------
  Buscar_Con_Seguimiento(data: Seguimiento): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Buscar_Con_Seguimiento=1", data);
  }
  Marcar_Conformidad(data: Conformidad): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Marcar_Conformidad=1", data);
  }
  //-------------------METODOS SEGUIMIENTOS "SEGUIMIENTOS" (END)--------------------

  //------------------SUPER-ADMIN METODOS (START)-------------------
  CambioColor(data: Cambio_Color): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?cambio_color=1", data);
  }
  Get_Suma_Promedios_Areas(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?Suma_Promedios_Areas=1");
  }
  GetAllUsers(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?Get_Usuarios=1");
  }
  GetAllAreas(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?Get_Areas=1");
  }
  GetAllAreasSelect(data: Clave_Poder): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Get_Areas_Select=1", data);
  }
  Get_Reclamos_Pendientes(): Observable<any> {
    return this.http.get(this.apiUrl + 'insert.php?Get_Reclamos_Pendientes');
  }
  Get_Reclamos_Iniciados(): Observable<any> {
    return this.http.get(this.apiUrl + 'insert.php?Get_Reclamos_Iniciados');
  }
  Get_Reclamos_Demorados(): Observable<any> {
    return this.http.get(this.apiUrl + 'insert.php?Get_Reclamos_Demorados');
  }
  Get_Reclamos_Resueltos(): Observable<any> {
    return this.http.get(this.apiUrl + 'insert.php?Get_Reclamos_Resueltos');
  }
  InsertArea(data: Destinacion): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?insertar_destinacion=1", data);
  }
  InsertUsuario(data: Cuenta_Usuario): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?insertar_cuenta_usuario=1", data);
  }
  Cambio_Estado(data: Cambio_Estado_Comunicacion): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Cambio_Estado_Comunicacion=1", data);
  }
  Iniciar_Plazo_V(data: Declarar_Plazo_V): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Iniciar_Plazo_Vencimiento=1", data);
  }
  Modificar_Destinacion(data: Modificar_Area): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Modificar_Destinacion=1", data);
  }

  Resta_Pendientes(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?resta_pendientes=1", data);
  }
  //------------------SUPER-ADMIN METODOS (END)-------------------

  //------------------METODOS DE FORMULARIO PRIVADO CONFIRMAR COMUNICACION (START)-------------------
  Confirmacion_Formulario_Privado(data: Confirmacion_Private_Form): Observable<any> {
    return this.http.post(this.apiUrl + "insert.php?Proceso_Confirmacion=1", data);
  }
  //------------------METODOS DE FORMULARIO PRIVADO CONFIRMAR COMUNICACION (END)-------------------

  //------------------GET METODOS ESTADISTICA (START)-------------------
  GetGlobalStatistics(): Observable<any> {
    return this.http.get(this.apiUrl + "insert.php?get_estadistica=1");
  }
  //------------------GET METODOS ESTADISTICA (END)-------------------

  //------------------METODO NOTIFICACIONES (START)-------------------
  Send_Mail(data: Reclamo): Observable<any> {
    return this.http.post(this.apiUrl + "mail.php", data);
  }

  Send_Mail_A_Ciudadano(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "mail_respuesta.php", data);
  }
  //------------------METODO NOTIFICACIONES (END)-------------------

  //------------------METODO DE CONTACTO EMAIL (START)-------------------
  Send_Mail_Contacto(data: Contacto): Observable<any> {
    return this.http.post(this.apiUrl + "mail_2.php", data);
  }
  //------------------METODO DE CONTACTO EMAIL (END)-------------------

  //------------------METODO DE VERIFICACION DE CORREO ELECTRONICO (START)-------------------
  Verificacion_de_Mail(data: Verificacion): Observable<any> {
    return this.http.post(this.apiUrl + "mail_3_verificacion.php", data);
  }
  //------------------METODO DE VERIFICACION DE CORREO ELECTRONICO (END)-------------------
}
