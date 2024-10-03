import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as L from 'leaflet';
import { endWith } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.css'
})
export class AdminHomeComponent implements OnInit {
  ///////HELP ACTIVATED//////////////////
  Help_Activated: boolean = false;

  ///////////////////UBICACIÓN ACTIVADA//////////////////
  Ubicacion_Existe: boolean = true;

////////////////////Detección de Archivo Adjunto//////////////
Archivo_Adjunto: boolean = false;

  //////////////Personalizacion Color////////////////
  Cambio_Color: any;
  Background_N: string;

  /////////////Filtros Aplicados Diplay Message////////////
  Filtros_Aplicados_Mensaje: string = 'Recientes';
  Filtros_Caracteres_Mensaje: string = 'Todos';

  LogIn3: boolean = false;
  ///////////////Formateo de Fecha y Hora/////////////////////
  formatDate: string = '';
  formatTime: string = '';

  ///////////////////Otras Variables////////////////////////7
  New_Area_Destinacion: string = '';
  Reclamo: any;
  Destinacion: any;
  Mensaje_Delegar_Function: string = 'Para reenviar esta comunicación, selecciona una nueva destinación:';
  Areas_row: any;
  Mensaje_Confirmar_Resuelta: string = '¿Realmente quieres Confirmar esta Comunicación como Resuelta?';
  Mensaje_Confirmar_Inicio: string = '¿Realmente quieres Iniciar el Plazo de Resoulución de esta Comunicación?';
  Mensaje_Confirmar_Inicio_2: string = 'Una vez iniciado, no podrá reenviarse ni cancelarse y se establecerá un vencimiento inamovible.';

  //////////Datos Dinámicos Visualizador Reclamo ///////////////
  numero_Rec: string = '';
  caracter_Rec: string = '';
  titulo_Rec: string = '';
  descripcion_Rec: string = '';
  ubicacion_Rec: string = '';
  ubicacion_2_Rec: string = '';
  Longitud: string = '';
  Latitud: string = '';
  fecha_Rec: string = '';
  hora_Rec: string = '';
  plazo_Rec: string = '';
  demoras_Rec: string = '';
  fecha_v_Rec: string = '';
  url_file: string = '';
  Destinacion_rec: string = '';
  Estado_Rec: string = '';
  Cod_conf_Rec: string = '';
  /////////Personal Data Comunicacion////////////
Nombre_Rec: string = '';
Telefono_Rec: string = '';
Email_Rec: string = '';
Email_d_Rec: string = '';
Domicilio_Rec: string = '';
Anonimo_Rec: string = '';

/////////////Datos Valoración Conformidad///////////////
Conformidad_Rec: string = '';
Feedback_Rec: string = '';

/////////////Datos Resolución///////////////
Fecha_r_Rec: string = '';
Comentario_Rec: string = '';

  //////////Datos Dinámicos Visualizador Reclamo ///////////////
  Reclamos: any[] = [];
  Reclamos_Filtrados: any[] = [];
  Clave_Poder: any;
Clave_Poder_2: any;
  Area_Data: any;
  Estado: any;
  Iniciar_Plazo_V_data: any;

  ////////////////BANDERAS///////////////
  flag_Resuelto: boolean = false;
  flag_Iniciado: boolean = false;
  flag_Resuelto_1: boolean = false;

  //////////////////////Variables de Buttons Filter aside and Header box////////////////////
  
  constructor(private router: Router, private dataService: DataService, public fb: FormBuilder) {
    this.Cambio_Color = this.fb.group({
      ID: [''],
      color: [''],
    });
    this.Estado = this.fb.group({
      clave_poder: [''],
      estado: [''],
      col_dest_before: [''],
      col_dest_now: [''],
      ID: [''],
      comentario: [''],
      fecha_r: ['']
    });
    this.Clave_Poder = this.fb.group({
      clave_poder: [''],
    });
    this.Clave_Poder_2 = this.fb.group({
      clave_poder: [''],
    });
    this.Destinacion = this.fb.group({
      ID: [''],
      destinacion: ['']
    });
    this.Iniciar_Plazo_V_data = this.fb.group({
      ID: [''],
      plazo_resolucion: ['']
    });
    this.Reclamo = this.fb.group({
      caracter: [''],
      titulo: [''],
      descripcion: [''],
      ubicacion_1: [''],
      ubicacion_2: [''],
      destinacion: [''],
      nombre: [''],
      telefono: [''],
      email: [''],
      email_d: [''],
      domicilio: [''],
      fecha: [''],
      hora: [''],
      estado: [''],
      plazo_resolucion: [''],
      vencimientos: [''],
      anonimo: [''],
      fecha_v: [''],
      file_1: [''],
      cod_conf: [''],
      comentario: [''],
      fecha_r: [''],
      conforme: [''],
      feedback: [''],
    });
  }

  Activate_Help_Window(): void {
    if (this.Help_Activated) {
      this.Help_Activated = false;
    } else{ 
      this.Help_Activated = true;
    }
  }

  RedirectTo(url: string): void {
    window.open(url, '_blank');
  }

  ////////////////Obtención de Registros Correspondientes al Área de Recepción///////////////////////7
  ngOnInit(): void {
    this.LogIn3 = this.dataService.LogIn_3;
    this.Estadisticas_Loader_Detroy();
    this.Get_Area();
    this.Clave_Poder.patchValue({ clave_poder: this.dataService.Clave_Poder });
    this.Estado.patchValue({ clave_poder: this.dataService.Clave_Poder});
    var Loader = document.getElementById('Loader_Data_2');
    var Header = document.getElementById('Header_Desktop');
    if (Header) {
      Header.style.display = 'none';
    }
    this.dataService.GetAreaReclamos(this.Clave_Poder.value).subscribe(res => {
      this.Reclamos = res;
      this.Reclamos_Filtrados = res;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Areas_Row(): void {
    this.Destinacion.patchValue({ ID: this.numero_Rec});
    var Message = document.getElementById('Success_ReSend');
         if (Message) {
      Message.style.display = 'flex';
    }
    this.dataService.GetAllAreas().subscribe(Response => {
      const idToRemove = this.dataService.Clave_Poder;
      this.Areas_row = Response.filter(Area => Area.clave_poder !== idToRemove);
    })
  }
  Cancelar_Reenviar_c(): void {
    var Message = document.getElementById('Success_ReSend');
    if (Message) {
 Message.style.display = 'none';
}
  }
  Reenviar_C(): void {
    var Select = document.getElementById('Select_Area_Resend');
    var Btn = document.getElementById('Btn_Resend_C');
    var Message = document.getElementById('Success_ReSend'); 
    var Btn_Cancel = document.getElementById('Cancelar_Btn_Reenviar_C');
    if (this.Destinacion.valid) {
      if (Btn && Select && Btn_Cancel) {
        Btn.style.display = 'none';
        Select.style.display = 'none';
        Btn_Cancel.style.display = 'none';
      }
      this.Mensaje_Delegar_Function = 'Reenviando...';
      this.dataService.DelegateClaim(this.Destinacion.value).subscribe(data => {
     
        this.dataService.Resta_Pendientes(this.Clave_Poder.value).subscribe(data2 => {
       
          this.dataService.AddStatistics(this.Destinacion.value).subscribe(res => {
            this.Mensaje_Delegar_Function = '¡Comunicación reenviada con éxito!';
          });
        });
        
        setTimeout(() => {
          Message.style.display = 'none';
          this.Mensaje_Delegar_Function = 'Para reenviar esta comunicación, selecciona una nueva destinación:';
          this.Reclamo.patchValue({ caracter: this.caracter_Rec });
          this.Reclamo.patchValue({ titulo: this.titulo_Rec });
          this.Reclamo.patchValue({ descripcion: this.descripcion_Rec + '. [ESTA COMUNICACIÓN HA SIDO REENVIADA DESDE ' + this.Area_Data[0].nombre_area+']' });
          this.Reclamo.patchValue({ ubicacion_1: this.ubicacion_Rec });
          this.Reclamo.patchValue({ ubicacion_2: this.ubicacion_2_Rec });
          this.Reclamo.patchValue({ destinacion: this.Destinacion_rec });
          this.Reclamo.patchValue({ nombre: this.Nombre_Rec });
          this.Reclamo.patchValue({ telefono: this.Telefono_Rec });
          this.Reclamo.patchValue({ email: this.Email_Rec });
          this.Reclamo.patchValue({ email_d: this.Email_d_Rec });
          this.Reclamo.patchValue({ domicilio: this.Domicilio_Rec });
          this.Reclamo.patchValue({ fecha: this.fecha_Rec });
          this.Reclamo.patchValue({ hora: this.hora_Rec });
          this.Reclamo.patchValue({ estado: this.Estado_Rec });
          this.Reclamo.patchValue({ plazo_resolucion: this.plazo_Rec });
          this.Reclamo.patchValue({ vencimientos: this.demoras_Rec });
          this.Reclamo.patchValue({ cod_conf: this.Cod_conf_Rec });
          if (this.Anonimo_Rec === '1') {
            this.Reclamo.patchValue({ anonimo: 'Sí' });
          } else {
            this.Reclamo.patchValue({ anonimo: 'No' });
          }
          this.Reclamo.patchValue({ fecha_v: this.fecha_v_Rec });
          this.Reclamo.patchValue({ file_1: this.url_file });
          this.Get_Area_Mail();
          Select.style.outline = '0px solid red';
        }, 3000);
        setTimeout(() => {
          this.Get_Recientes();
          this.GoBack();
          this.Remove_Element();
          if (Btn && Select && Btn_Cancel) {
            Btn.style.display = 'flex';
            Select.style.display = 'flex';
            Btn_Cancel.style.display = 'flex';
          }
        }, 4000);
      })
    } else {
      if (Select) {
        Select.style.outline = '3px solid red';
      }
    }
  }
  Open_Iniciar_Plazo_Window(): void {
    var Window = document.getElementById('Confirmar_Iniciado_Window');
    if (this.flag_Iniciado) {
      if (Window){
        Window.style.display = 'none';
      }
      this.flag_Iniciado = false;
    } else {
      if (Window){
        Window.style.display = 'flex';
      }
      this.flag_Iniciado = true;
    }
  }
  Iniciar_Plazo_V(): void {
    var Window = document.getElementById('Confirmar_Iniciado_Window');
    var Buttons = document.getElementById('Buttons_Confirmar_Inicio');
    if (Buttons) {
      Buttons.style.display = 'none';
    }
    this.Mensaje_Confirmar_Inicio_2 = '';
    this.Mensaje_Confirmar_Inicio = '...';

    this.Estado.patchValue({ clave_poder: this.dataService.Clave_Poder });
    this.Estado.patchValue({ col_dest_before: 'pendientes' });
    this.Estado.patchValue({ col_dest_now: 'iniciados' });
    this.Estado.patchValue({ ID: this.numero_Rec });
    this.Estado.patchValue({ estado: 'Iniciado' });
    this.Estado.patchValue({ plazo_resolucion: this.plazo_Rec });

    this.Iniciar_Plazo_V_data.patchValue({ ID: this.numero_Rec});
    this.Iniciar_Plazo_V_data.patchValue({ plazo_resolucion: this.plazo_Rec});

    this.dataService.Cambio_Estado(this.Estado.value).subscribe( data => {
      this.dataService.Iniciar_Plazo_V(this.Iniciar_Plazo_V_data.value).subscribe( data=> {
        this.Mensaje_Confirmar_Inicio = '¡La comunicación se ha Iniciado con Éxito!';
  setTimeout(() => {
    if (Window && Buttons){
      Window.style.display = 'none';
      Buttons.style.display = 'flex';
    }
    this.Mensaje_Confirmar_Inicio_2 = 'Una vez iniciado, no podrá reenviarse ni cancelarse y se establecerá un vencimiento inamovible.';
    this.Mensaje_Confirmar_Inicio = '¿Realmente quieres Iniciar el Plazo de Resolución de esta Comunicación?';
    this.Get_Recientes();
    this.GoBack();
    this.Remove_Element();
  }, 3000);
      })
    })

  }

  Get_Pendientes(): void {
    this.Filtros_Aplicados_Mensaje = 'Pendientes';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '3px solid rgb(0, 255, 242)';
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetPendientes(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos_Filtrados = data;
      this.Reclamos = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Recientes(): void {
    this.Filtros_Aplicados_Mensaje = 'Recientes';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }

    var Container = document.getElementById('Registro_Fila_Reclamo');
    if (Container) {
      Container.scrollTop = 0;
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetAreaReclamos(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos = data;
      this.Reclamos_Filtrados = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Antiguos(): void {
    this.Filtros_Aplicados_Mensaje = 'Antiguos';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    var Container = document.getElementById('Registro_Fila_Reclamo');
    if (Container) {
      Container.scrollTop = 0;
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetAntiguos(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos_Filtrados = data;
      this.Reclamos = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Iniciados(): void {
    this.Filtros_Aplicados_Mensaje = 'Iniciados';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetIniciados(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos_Filtrados = data;
      this.Reclamos = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Demorados(): void {
    this.Filtros_Aplicados_Mensaje = 'Demorados';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetDemorados(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos_Filtrados = data;
      this.Reclamos = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  Get_Resueltos(): void {
    this.Filtros_Aplicados_Mensaje = 'Resueltos';
    this.Filtros_Caracteres_Mensaje = 'Todos';
    var Btn_1A = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2A = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3A = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4A = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5A = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6A = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1A && Btn_2A && Btn_3A && Btn_4A && Btn_5A && Btn_6A) {
      Btn_1A.style.outline = '0px solid white';
      Btn_2A.style.outline = '0px solid white';
      Btn_3A.style.outline = '0px solid white';
      Btn_4A.style.outline = '0px solid white';
      Btn_5A.style.outline = '0px solid white';
      Btn_6A.style.outline = '0px solid white';
    }
    var Btn_1 = document.getElementById('Btn_1_Header_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Header_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Header_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Header_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Header_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Header_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_6.style.outline = '0px solid white';
    }
    var Loader = document.getElementById('Loader_Bandeja_Entrada');
    if (Loader) {
      Loader.style.display = 'flex';
    }
    this.dataService.GetResueltos(this.Clave_Poder.value).subscribe(data => {
      this.Reclamos_Filtrados = data;
      this.Reclamos = data;
      if (Loader) {
        Loader.style.display = 'none';
      }
    })
  }
  ////////////////////////Sistema de Filtros de Registros/////////////////////
  Sugerencia_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Sugerencias';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    const tiposPermitidos = ['Sugerencia'];
    const registrosFiltrados = this.Reclamos.filter(registro =>
      tiposPermitidos.includes(registro.caracter)
    );
    this.Reclamos_Filtrados = registrosFiltrados;
  }
  Denuncia_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Denuncias';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    const tiposPermitidos = ['Denuncia'];

    const registrosFiltrados = this.Reclamos.filter(registro =>
      tiposPermitidos.includes(registro.caracter)
    );
    this.Reclamos_Filtrados = registrosFiltrados;
  }
  Consulta_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Consultas';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    const tiposPermitidos = ['Consulta'];

    const registrosFiltrados = this.Reclamos.filter(registro =>
      tiposPermitidos.includes(registro.caracter)
    );
    this.Reclamos_Filtrados = registrosFiltrados;
  }
  Solicitud_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Solicitudes';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '0px solid white';
    }
    const tiposPermitidos = ['Solicitud'];

    const registrosFiltrados = this.Reclamos.filter(registro =>
      tiposPermitidos.includes(registro.caracter)
    );
    this.Reclamos_Filtrados = registrosFiltrados;
  }
  Reclamo_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Reclamos';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '3px solid rgb(0, 255, 242)';
      Btn_6.style.outline = '0px solid white';
    }
    const tiposPermitidos = ['Reclamo'];
    const registrosFiltrados = this.Reclamos.filter(registro =>
      tiposPermitidos.includes(registro.caracter)
    );
    this.Reclamos_Filtrados = registrosFiltrados;
  }
  Todos_Filter(): void {
    this.Filtros_Caracteres_Mensaje = 'Cualquier Carácter';

    var Btn_1 = document.getElementById('Btn_1_Filter_Admin_Home');
    var Btn_2 = document.getElementById('Btn_2_Filter_Admin_Home');
    var Btn_3 = document.getElementById('Btn_3_Filter_Admin_Home');
    var Btn_4 = document.getElementById('Btn_4_Filter_Admin_Home');
    var Btn_5 = document.getElementById('Btn_5_Filter_Admin_Home');
    var Btn_6 = document.getElementById('Btn_6_Filter_Admin_Home');
    if (Btn_1 && Btn_2 && Btn_3 && Btn_4 && Btn_5 && Btn_6) {
      Btn_1.style.outline = '0px solid white';
      Btn_2.style.outline = '0px solid white';
      Btn_3.style.outline = '0px solid white';
      Btn_4.style.outline = '0px solid white';
      Btn_5.style.outline = '0px solid white';
      Btn_6.style.outline = '3px solid rgb(0, 255, 242)';
    }
    this.Reclamos_Filtrados = this.Reclamos;
  }

  ////////////////////////Obtención de Información del Área de Recepción////////////////////////7
  Get_Area(): void {
    this.Clave_Poder.patchValue({ clave_poder: this.dataService.Clave_Poder });
    this.dataService.GetAllAreasSelect(this.Clave_Poder.value).subscribe(Response => {
      this.Area_Data = Response;
      this.Background_N = this.Area_Data[0].color;
      this.Cambio_Color.patchValue({ ID: this.Area_Data[0].id});
      this.dataService.Pendientes = this.Area_Data[0].pendientes;
      this.dataService.Iniciados = this.Area_Data[0].iniciados;
      this.dataService.Demorados = this.Area_Data[0].demorados;
      this.dataService.Resueltos = this.Area_Data[0].resueltos;
    })
  }
  Get_Area_Mail(): void {
    const clave_poder = this.Destinacion.value;
    this.Clave_Poder_2.patchValue({ clave_poder: clave_poder.destinacion });
    this.dataService.GetAllAreasSelect(this.Clave_Poder_2.value).subscribe(data => {
      this.Email_d_Rec = data[0].email;
      this.Reclamo.patchValue({ email_d: data[0].email });
      const reclamo = this.Reclamo.value;
      this.dataService.Send_Mail(reclamo).subscribe(data => {
      
      })
    })
  }
  ////////////////Enrutamiento System////////////////////7
  BandejaEntrada() {
    this.router.navigate(['/Bandeja-Entrada']);
  }
  NavigateToHome() {
    this.router.navigate(['/Home']);
    this.dataService.LogIn_1 = false;
    this.dataService.LogIn_2 = false;
    this.dataService.LogIn_3 = false;
  }
  //////////////////Visualizador de Reclamos/////////////////////
  Open_Reclamo(
    Numero: string,
    Caracter: string,
    Asunto: string,
    Descripcion: string,
    Ubicacion: string,
    Ubicacion_2_coord: string,
    Plazo: string,
    Demoras: string,
    Fecha: string,
    Hora: string,
    Fecha_v: string,
    File_1: string,
    Destinacion: string,
    Nombre: string,
    Telefono: string,
    Email: string,
    Domicilio: string,
    Estado: string,
    Anonimo: string,
    Cod_conf: string,
    Conformidad: string,
    Feedback: string,
    Comentario: string,
    Fecha_R: string
  ): void {
    var Ventana = document.getElementById('Scroll_Box_Container_Open_Reclamo');
    var Fila = document.getElementById('Registro_Fila_Reclamo');
    if (Ventana && Fila) {
      Ventana.style.display = 'flex';
      Fila.style.display = 'none';
    }
    this.numero_Rec = Numero;
    this.caracter_Rec = Caracter;
    this.titulo_Rec = Asunto;
    this.descripcion_Rec = Descripcion;
    this.ubicacion_Rec = Ubicacion;
    this.ubicacion_2_Rec = Ubicacion_2_coord;
    if (this.ubicacion_2_Rec === '') {
      this.ubicacion_2_Rec = '*NINGUNA UBICACIÓN MARCADA*';
      this.Ubicacion_Existe = false;
    } else {
      this.Ubicacion_Existe = true;
    }
    this.plazo_Rec = Plazo;
    this.demoras_Rec = Demoras;
    this.fecha_Rec = Fecha;
    this.hora_Rec = Hora;
    this.url_file = File_1;
    if (this.url_file === '*NINGUNO*') {
      this.Archivo_Adjunto = false;
      this.url_file = 'No se ha adjuntado ningún archivo.';
    } else {
      this.Archivo_Adjunto = true;
    }
    this.Destinacion_rec = Destinacion;
    this.Nombre_Rec = Nombre;
    this.Telefono_Rec = Telefono;
    this.Email_Rec = Email;
    this.Domicilio_Rec = Domicilio;
    this.Estado_Rec = Estado;
    this.Cod_conf_Rec = Cod_conf;
    this.Conformidad_Rec = Conformidad;

    if (Feedback === '') {
      this.Feedback_Rec = 'Sin comentarios.';
    } else {
      this.Feedback_Rec = Feedback;
    }
    if (Comentario === '--') {
      this.Comentario_Rec = 'Aún no se ha resuelto.';
    } else {
      this.Comentario_Rec = Comentario;
    }
    if (Fecha_R === '0000-00-00') {
      this.Fecha_r_Rec = 'Aún no se ha resuelto.';
    } else {
      this.Fecha_r_Rec = Fecha_R;
    }
    
    if (Anonimo === '1') {
      this.Anonimo_Rec = 'Sí';
      this.Nombre_Rec = '--';
      this.Telefono_Rec = '--';
      this.Email_Rec = '--';
      this.Domicilio_Rec = '--';
    } else {
      this.Anonimo_Rec = 'No';
    }
    if (Fecha === Fecha_v) {
      this.fecha_v_Rec = 'Aún sin definir';
    } else {
      this.fecha_v_Rec = Fecha_v;
    }
    const regex = /LatLng\((-?\d+\.\d+), (-?\d+\.\d+)\)/;
    const matches = Ubicacion_2_coord.match(regex);

    if (matches && matches.length === 3) {
      this.Latitud = matches[1];
      this.dataService.Latitud = parseFloat(matches[1]);
      this.Longitud = matches[2];
      this.dataService.Longitud = parseFloat(matches[2]);
    }
  }
  ////////////////////////Generador de PDFs////////////////////////////
  generarPDF() {
    const documentDefinition = {
      content: [
        {
          text: 'Fecha: ' + this.fecha_Rec + '\n',
          style: 'small4'
        },
        {
          text: 'Hora: ' + this.hora_Rec + '\n',
          style: 'small4'
        },
        {
          text: 'Tinogasta, Catamarca\n',
          style: 'small4',
          bold: true
        },
        {
          text: this.caracter_Rec + ': ' + this.titulo_Rec,
          style: 'header',
          alignment: 'center'
        },
        '\n\n',
        {
          text: 'Identificador: ' + this.numero_Rec + '\n',
          style: 'small3'
        },
        {
          text: 'Carácter: ' + this.caracter_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Asunto: ' + this.titulo_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Plazo de Resolución Actual: ' + this.plazo_Rec + ' días' + '\n',
          style: 'small2'
        },
        {
          text: 'Próximo Vencimiento: ' + this.fecha_v_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Veces Demorado/Vencido: ' + this.demoras_Rec + '\n\n',
          style: 'small2'
        },
        {
          text: 'El Remitente es Anónimo: ' + this.Anonimo_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Nombre: ' + this.Nombre_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Teléfono: ' + this.Telefono_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'E-mail: ' + this.Email_Rec + '\n',
          style: 'small2'
        },
        {
          text: 'Domicilio: ' + this.Domicilio_Rec + '\n\n\n',
          style: 'small2'
        },
        {
          text: 'Valoración Ciudadana:',
          style: 'subheader',
          alignment: 'center'
        },
        {
          text: 'Ciudadano/a ' + this.Conformidad_Rec + '\n',
          style: 'small2'
        },
        this.Feedback_Rec + '\n\n\n',
        {
          text: 'Resolución:',
          style: 'subheader',
          alignment: 'center'
        },
        {
          text: 'Fecha: ' + this.Fecha_r_Rec + '\n',
          style: 'small2'
        },
        this.Comentario_Rec + '\n\n\n',
        {
          text: 'Descripción:',
          style: 'subheader',
          alignment: 'center'
        },
        this.descripcion_Rec + '\n\n\n',
        {
          text: 'Ubicación:',
          style: 'subheader',
          alignment: 'center'
        },
        this.ubicacion_Rec + '\n',
        'Coordenadas: ' + this.ubicacion_2_Rec + '\n\n\n',
        {
          text: 'Adjuntos:',
          style: 'subheader',
          alignment: 'center'
        },
        {
          text: this.url_file + '\n\n\n\n\n',
          style: 'small2', color: 'blue'
        },
        {
          text: 'Mesa de Entrada Digital MEDi',
          alignment: 'right',
          style: 'small'
        },
        {
          text: 'Tinogasta Municipio',
          alignment: 'right',
          style: 'small'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 15,
          bold: true,
          alignment: 'center'
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        small2: {
          fontSize: 10
        },
        small3: {
          bold: true,
          fontSize: 10
        },
        small4: {
          fontSize: 9,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download(this.caracter_Rec +'-MEDi'+ '-Nro-'+this.numero_Rec+'.pdf');
  }
  GoBack(): void {
    this.Ubicacion_Existe = true;
    var Filas = document.getElementById('Registro_Fila_Reclamo');
    var Ventana = document.getElementById('Scroll_Box_Container_Open_Reclamo');
    if (Filas && Ventana) {
      Filas.style.display = 'flex';
      Ventana.style.display = 'none';
    }
  }
  ///////////////Mapa de Inyección//////////////////
  Map_Inject_2(): void {
    var NewMap = document.createElement('div');
    NewMap.id = 'map_2';
    var ContainerMap = document.getElementById('Process_Container_Map');
    if (ContainerMap) {
      ContainerMap.appendChild(NewMap);
    }
    var Map_Map = document.getElementById('map_2');
    if (Map_Map) {
      Map_Map.style.width = '100%';
      Map_Map.style.height = '100%';
      Map_Map.style.display = 'none';
    }
    setTimeout(() => {
      var Map_2 = document.getElementById('map_2');
      if (Map_2) {
        Map_2.style.display = 'flex';
      }
      const map2 = L.map('map_2').setView([this.dataService.Latitud, this.dataService.Longitud], 14);
      L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map2);
      var marker = L.marker([this.dataService.Latitud, this.dataService.Longitud]).addTo(map2);
    }, 500);
  }
  Remove_Element(): void {
    var Element = document.getElementById('map_2');
    if (Element) {
      Element.remove();
    }
  }
  Open_Close_Resuelto_Win_1(): void {
    var Error_Message = document.getElementById('Error_Mensaje_Confirmar_Resuelto');
    var TextArea = document.getElementById('Resolucion_TextArea');
    Error_Message.style.color = 'white';
    Error_Message.style.textDecoration = 'none';
    Error_Message.style.textShadow = '0 0 0 black';
    TextArea.style.outline = '0 solid white';
    this.Estado.patchValue({ comentario: ''});
    var Window = document.getElementById('Ventana_Emergente_Confirmar_Resuelto');
    if (this.flag_Resuelto_1) {
      if (window) {
        Window.style.display = 'none';
      }
      this.flag_Resuelto_1 = false;
    } else {
      if (window) {
        Window.style.display = 'flex';
      }
      this.flag_Resuelto_1 = true;
    }

  }
  Verificar_Validez_Resolucion(): void {
    var Error_Message = document.getElementById('Error_Mensaje_Confirmar_Resuelto');
    var TextArea = document.getElementById('Resolucion_TextArea');
    if (this.Estado.get('comentario').value.length < 50) {
       if (Error_Message && TextArea) {
        Error_Message.style.color = 'red';
        Error_Message.style.textDecoration = 'underline';
        Error_Message.style.textShadow = '0 0 10px black';
        TextArea.style.outline = '3px solid red';
       }
    } else {
      if (Error_Message && TextArea) {
        Error_Message.style.color = 'white';
        Error_Message.style.textDecoration = 'none';
        Error_Message.style.textShadow = '0 0 0 black';
        TextArea.style.outline = '0 solid white';
       }
       this.Open_Close_Resuelto_Win();
    }
  }
  Open_Close_Resuelto_Win(): void {
    var Window = document.getElementById('Confirmar_Resuelto_Window');

    if (this.flag_Resuelto) {
      if (Window) {
        Window.style.display = 'none';
      }
      this.flag_Resuelto = false;
    } else {
      if (Window) {
        Window.style.display = 'flex';
      }
      this.flag_Resuelto = true;
    }
   
  }
  formatDate_1(date: Date): string {
    // Formato YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
  Marcar_Resuelta(): void {
    const now = new Date();
    this.formatDate = this.formatDate_1(now);
    this.Estado.patchValue({ fecha_r: this.formatDate });
    var Buttons = document.getElementById('Buttons_Confirmar_Resuelto');
    if (Buttons) {
      Buttons.style.display = 'none';
    }
    this.Mensaje_Confirmar_Resuelta = '...';
    this.Estado.patchValue({ ID: this.numero_Rec });
    this.Estado.patchValue({ estado: 'Resuelto' });

    ////////INFO ESTADISTICA///////
    switch (this.Estado_Rec) {
      case 'Pendiente':
        this.Estado.patchValue({ col_dest_before: 'pendientes'});
        break;
        case 'Iniciado':
          this.Estado.patchValue({ col_dest_before: 'iniciados'});
          break;
          case 'Demorado':
            this.Estado.patchValue({ col_dest_before: 'demorados'});
            break;
            case 'Resuelto':
              this.Estado.patchValue({ col_dest_before: 'resueltos'});
              break;
              case 'Eliminado':
                this.Estado.patchValue({ col_dest_before: 'eliminados'});
                break;
      default:
        break;
    }

    this.Estado.patchValue({ col_dest_now: 'resueltos'}); //// -- Validos: pendientes , iniciados , demorados , resueltos , eliminados
    const Estado = this.Estado.value;
    this.dataService.Cambio_Estado(Estado).subscribe(data => {
      this.Mensaje_Confirmar_Resuelta = '¡La Comunicación ha sido Confirmada como Resuelta Exitosamente!';
      setTimeout(() => {
        this.Open_Close_Resuelto_Win();
        this.Open_Close_Resuelto_Win_1();
        this.Mensaje_Confirmar_Resuelta = '¿Realmente quieres Confirmar esta Comunicación como Resuelta?';
        this.Get_Recientes();
        this.GoBack();
        this.Remove_Element();
        if (Buttons) {
          Buttons.style.display = 'flex';
        }
      }, 3000);
    })
  }

  Estadisticas_Loader_Detroy(): void {
    var Loader = document.getElementById('Estadisticas_Loader');
    setTimeout(() => {
      if (Loader) {
        Loader.remove();
      }
    }, 3000);
  }
  GoBack_Super_Admin(): void {
    if (this.dataService.LogIn_3){
      this.Poq0hZAF20U5FQKtgpoLBJG1MTvfbatrY69KCtDbOb20F5tYMTqt9UPaFtu0iEJm();
    } else {
      this.NavigateToHome();
    }

  }
  Poq0hZAF20U5FQKtgpoLBJG1MTvfbatrY69KCtDbOb20F5tYMTqt9UPaFtu0iEJm() {
    this.router.navigate(['/Super-Admin']);
  }
  cambiar_color(color: string): void {
    this.Background_N = color;
    this.Cambio_Color.patchValue({ color: color});
    this.dataService.CambioColor(this.Cambio_Color.value).subscribe(data=> {
    })
  }
}
