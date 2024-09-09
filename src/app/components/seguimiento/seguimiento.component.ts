import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrl: './seguimiento.component.css'
})
export class SeguimientoComponent {
  Comunicacion: any;
  Seguimiento: any;
  Conformidad: any;
  Error_Mensaje: string = '';
  Fecha_Vencimiento: string = '';
  Estado: string = '';
  Resolucion: string = '';
  Marcado_Conforme: boolean = false;
  Opcion_Marcada: boolean = false;

  Mensaje_Post_Valoracion: boolean = false;
  constructor(private dataSerivce: DataService, public fb: FormBuilder) {
    this.Seguimiento = this.fb.group({
      seguimiento: [''],
    });
    this.Conformidad = this.fb.group({
      ID: [''],
      conforme: [''],
      feedback: ['']
    });
  }
  Buscar_Otro():void {
    this.Error_Mensaje = '';
    var Form = document.getElementById('Formulario_Seguimiento_Comunicacion');
    var Seguimiento = document.getElementById('Info_Seguimiento_Comunicacion');
    var Mensaje_Gracias = document.getElementById('Mensaje_Resultado_Conformidad_Form_Seguimiento');
    if (Form && Seguimiento && Mensaje_Gracias) {
      Mensaje_Gracias.style.display = 'none';
      Seguimiento.style.display = 'none';
      Form.style.display = 'flex';
    }
  }
  Marcar_Conformidad(flag: boolean): void {
    this.Opcion_Marcada = true;
    var Button_0 = document.getElementById('Button_Conformidad_Negativa');
    var Button_1 = document.getElementById('Button_Conformidad_Positivia');
    if (flag) {
      if (Button_0 && Button_1) {
        Button_0.style.backgroundColor = 'rgb(255, 120, 50)';
        Button_1.style.backgroundColor = 'aqua';
      }
      this.Marcado_Conforme = true;
    } else {
      if (Button_0 && Button_1) {
        Button_0.style.backgroundColor = 'aqua';
        Button_1.style.backgroundColor = 'rgb(255, 120, 50)';
      }
      this.Marcado_Conforme = false;
    }
  }
  Enviar_Conformidad(): void {
    var Mensaje = document.getElementById('Mensaje_Resultado_Conformidad_Form_Seguimiento');
    var Form = document.getElementById('Form_Conformidad_Seguimiento');
    if (!(this.Comunicacion[0].conforme === 'Aún sin valoración') && this.Comunicacion[0].estado === 'Resuelto') {
      this.Mensaje_Post_Valoracion = true;
      

    }
    this.Conformidad.patchValue({ ID: this.Comunicacion[0].id});
    if (this.Marcado_Conforme) {
      this.Conformidad.patchValue({ conforme: 'Conforme'});
    } else {
      this.Conformidad.patchValue({ conforme: 'Inconforme'});
    }
    this.dataSerivce.Marcar_Conformidad(this.Conformidad.value).subscribe(data=> {
if (Mensaje && Form) {
  Mensaje.style.display = 'flex';
  Form.style.display = 'none';
  
}
    })
  }
  Buscar(): void {
    var Button = document.getElementById('Button_Buscar_Seguimiento');
    var Loader = document.getElementById('Loader_Seguimiento');
    var Inpupt = document.getElementById('Input_Codigo_Seguimiento');
    var Seguimiento_Info = document.getElementById('Info_Seguimiento_Comunicacion');
    var Seguimiento_Form = document.getElementById('Formulario_Seguimiento_Comunicacion');
    if (this.Seguimiento.valid) {
    if (Inpupt && Loader && Button) {
      Inpupt.style.outline = '3px solid rgba(255, 0, 0, 0)';
      Loader.style.display = 'flex';
      Button.style.display = 'none';
    }
      this.dataSerivce.Buscar_Con_Seguimiento(this.Seguimiento.value).subscribe( data => {
        this.Comunicacion = data;
        if (data.length === 0) {
          if (Loader && Button && Seguimiento_Info && Seguimiento_Form) {
            Loader.style.display = 'none';
            Button.style.display = 'flex';
          }
          this.Error_Mensaje = 'Comunicación Inexistente';
        } else {
          if (Loader && Button && Seguimiento_Info && Seguimiento_Form) {
            Loader.style.display = 'none';
            Button.style.display = 'flex';
            Seguimiento_Form.style.display = 'none';
            Seguimiento_Info.style.display = 'flex';
          }
          if (!(this.Comunicacion[0].conforme === 'Aún sin valoración') && this.Comunicacion[0].estado === 'Resuelto') {
            this.Mensaje_Post_Valoracion = true;
            var Mensaje = document.getElementById('Mensaje_Resultado_Conformidad_Form_Seguimiento');
            if (Mensaje) {
              Mensaje.style.display = 'flex';
            }
          }
          if (this.Comunicacion[0].fecha === this.Comunicacion[0].fecha_v) {
            this.Fecha_Vencimiento = 'Aún no ha sido definida';
          } else {
            this.Fecha_Vencimiento = this.Comunicacion[0].fecha_v;
          }
          if (this.Comunicacion[0].estado === 'Pendiente') {
            this.Estado = 'Pendiente (Aún esta a la espera de revisión por parte del área responsable)';
          }
          if (this.Comunicacion[0].estado === 'Iniciado') {
            this.Estado = 'Iniciado (Ya esta en proceso y a la espera de una resolución antes de la fecha de vencimiento)';
          }
          if (this.Comunicacion[0].estado === 'Demorado') {
            this.Estado = 'Demorado (Aún sin resolver y ya ha sobrepasado la fecha límite una vez)';
          }
          if (this.Comunicacion[0].estado === 'Resuelto') {
            this.Estado = 'Resuelto (¡Tu comunicación ya ha sido resuelta!)';
          }
          if (this.Comunicacion[0].comentario === '--') {
            this.Resolucion = 'Aún sin una Resolución.';
          } else {
            this.Resolucion = this.Comunicacion[0].comentario;
          }
          this.Seguimiento.patchValue({ seguimiento: ''});
        }
      })
    } else {
      var Inpupt = document.getElementById('Input_Codigo_Seguimiento');
      if (Inpupt) {
        Inpupt.style.outline = '3px solid red';
      }
    }
  }
}
