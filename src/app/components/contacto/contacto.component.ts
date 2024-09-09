import { Component } from '@angular/core';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrl: './contacto.component.css'
})
export class ContactoComponent {
  Contacto: any;
  Mensaje_Error: string = '';
  constructor(private dataService: DataService, public fb: FormBuilder) {
    this.Contacto = this.fb.group({
      nombre: [''],
      email: [''],
      asunto: [''],
      mensaje: [''],
    });
  }

  Enviar_Correo(): void {
    var input_1 = document.getElementById('Input_nombre_cas_ctc');
    var input_2 = document.getElementById('Input_email_cas_ctc');
    var input_3 = document.getElementById('Input_asunto_cas_ctc');
    var input_4 = document.getElementById('Input_mensaje_cas_ctc');
    var Button = document.getElementById('Button_Enviar_Casilla_Contacto');
    this.Mensaje_Error = '';
    if (this.Contacto.valid) {
      if (Button && input_1 && input_2 && input_3 && input_4) {
        Button.style.display = 'none';
        input_1.style.display = 'none';
        input_2.style.display = 'none';
        input_3.style.display = 'none';
        input_4.style.display = 'none';
      }
      this.dataService.Send_Mail_Contacto(this.Contacto.value).subscribe( data => {
      })
      setTimeout(() => {
        this.Mensaje_Error = '¡Tu mensaje ha sido enviado con éxito!';
      }, 2000);
    } else {
      this.Mensaje_Error = '¡Todos los campos son obligatorios!';
    }

  }
}
