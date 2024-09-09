import { Component } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-confirmar',
  templateUrl: './confirmar.component.html',
  styleUrl: './confirmar.component.css'
})
export class ConfirmarComponent {
  codigoNumerico: string;
  Confirmacion: any;
  Comunicacion: any[] = [];
  flag_error: boolean = false;
  Ventana_Emergente: boolean = false;
  Estado: any;
  Mensaje_Error: string = 'No se ha encontrado ningúna comunicación.';
  constructor(private route: ActivatedRoute, private dataService: DataService, public fb: FormBuilder){
    this.Confirmacion = this.fb.group({
      cod_conf: [''],
      estado: [''],
    });
    this.Estado = this.fb.group({
      clave_poder: [''],
      estado: [''],
      col_dest_before: [''],
      col_dest_now: [''],
      ID: [''],
      plazo_resolucion: [''],
    });
  }
  ngOnInit(): void {
    // Suscríbete a los parámetros de la URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Obtén el parámetro 'codigo' y conviértelo a número
      const codigo = params.get('codigo');
      if (codigo) {
        this.codigoNumerico = codigo; // El símbolo + convierte el string a number
        this.Buscar_Comunicacion();
      } else {
        // Manejo de error o asignación de valor por defecto
        this.codigoNumerico = 'Nulo';
        this.flag_error = true;
      }
    });
  }
  Buscar_Comunicacion(): void {
    this.Confirmacion.patchValue({ cod_conf: this.codigoNumerico })
    this.dataService.Confirmacion_Formulario_Privado(this.Confirmacion.value).subscribe( data => {
      this.Comunicacion = data;
      if (this.Comunicacion.length === 0) {
        this.Mensaje_Error = 'No se ha encontrado ningúna comunicación.';
        this.flag_error = true;
      }
      if (this.Comunicacion[0].estado === 'Iniciado') {
        this.flag_error = true;
        this.Mensaje_Error = 'Error: Esta Comunicación ya ha sido Iniciada.';
      }
      if (this.Comunicacion[0].estado === 'Demorado') {
        this.flag_error = true;
        this.Mensaje_Error = 'Error: Esta Comunicación ya ha sido Iniciada y esta Demorada.';
      }
      if (this.Comunicacion[0].estado === 'Resuelto') {
        this.flag_error = true;
        this.Mensaje_Error = 'Error: Esta Comunicación ya ha sido Resuelta.';
      }
    })
  }
  Open_Ventana_Emergente(): void {
    if (this.Ventana_Emergente) {
      var Window = document.getElementById('Ventana_Emergente_Confirmar_Recibido');
      if (Window) {
        Window.style.display = 'none';
      }
      this.Ventana_Emergente = false;
    } else {
      var Window = document.getElementById('Ventana_Emergente_Confirmar_Recibido');
      if (Window) {
        Window.style.display = 'flex';
      }
      this.Ventana_Emergente = true;
    }
  }
  Marcar_Iniciada(): void {
    if (this.Comunicacion.length === 0) {
      this.Mensaje_Error = 'No se ha encontrado ningúna comunicación.';
      this.flag_error = true;

  } else {
    var button = document.getElementById('Button_Confirmar_Comunicacion');
    if (button) {
      button.style.display = 'none';
    }
    this.Estado.patchValue({ clave_poder: this.Comunicacion[0].destinacion });
    this.Estado.patchValue({ col_dest_before: 'pendientes' });
    this.Estado.patchValue({ col_dest_now: 'iniciados' });
    this.Estado.patchValue({ ID: this.Comunicacion[0].id });
    this.Estado.patchValue({ estado: 'Iniciado' });
    this.Estado.patchValue({ plazo_resolucion: this.Comunicacion[0].plazo_resolucion });
    this.dataService.Cambio_Estado(this.Estado.value).subscribe(data => {
      this.dataService.Iniciar_Plazo_V(this.Estado.value).subscribe(data => {
        this.flag_error = true;
        this.Mensaje_Error = '¡La Comunicación N° '+ this.Comunicacion[0].id +' se ha Iniciado Exitosamente!';
      })
    })
  }
}
}