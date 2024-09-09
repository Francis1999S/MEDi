import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrl: './modificar.component.css'
})
export class ModificarComponent implements OnInit {
  error1: string = '';
  error2: string = '';
  error3: string = '';
  Modificar: any;
  Nombre_area: string = '';
  Nombre_area_2:string = '';
  Descripcion: string = '';
  Email: string = '';
  Email_Verificado: boolean = false;
  Codigo_Verificacion_Email: string = '';
  Codigo_Enviado: boolean = false;
  Array_All_Areas: any[] = [];
  Area_a_Modificar: any[] = [];
  Resultado_Creacion: string = '';
  
  constructor(
    private dataService: DataService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.Modificar = this.fb.group({
      nombre_area: [''],
      descripcion: [''],
      clave_poder: [''],
      email: [''],
      codigo_verif: [''],
      codigo_verif_2: ['']
    });
  }
  ngOnInit(): void {
    this.Modificar.patchValue({ clave_poder: this.dataService.Clave_Poder_Modificacion })
    this.Codigo_Verificacion_Email = this.generarCodigo(8);
    this.Modificar.patchValue({ codigo_verif: this.Codigo_Verificacion_Email});
    this.Cambio_Interfaz(1);
    this.dataService.GetAllAreasSelect(this.Modificar.value).subscribe(data => {
    this.Area_a_Modificar = data;
    this.Modificar.patchValue({ nombre_area: data[0].nombre_area});
    this.Nombre_area_2 = data[0].nombre_area;
    this.Modificar.patchValue({ descripcion: data[0].descripcion});
    this.Modificar.patchValue({ email: data[0].email});
    })
    this.dataService.GetAllAreas().subscribe(data=> {
      for (let i = 0; i < data.length; i++) {
        this.Array_All_Areas.push(data[i].nombre_area);
      }
      var index: number = this.Array_All_Areas.indexOf(this.Nombre_area_2);
  this.Array_All_Areas.splice(index, 1);
    })
  }
  Cambio_Interfaz(interfaz: number): void {
    var Section_1 = document.getElementById('Modificar_Area_Container_1');
    var Section_1_2 = document.getElementById('Modificar_Area_Container_1_2');
    var Section_3 = document.getElementById('Modificar_Area_Container_3');
    var Error_Display_1 = document.getElementById('Error_Display_1_modificar');
    var Error_Display_2 = document.getElementById('Error_Display_2_modificar');
    var Error_Display_3 = document.getElementById('Error_Display_3_modificar');
    switch (interfaz) {
      case 1:
        if (Section_1 && Section_3 && Section_1_2) {
          Section_1.style.display = 'flex';
          Section_1_2.style.display = 'none';
          Section_3.style.display = 'none';
        }
        break;
      case 2:
        if (Section_1 && Section_3 && Section_1_2) {
          Section_1.style.display = 'none';
          Section_1_2.style.display = 'flex';
          Section_3.style.display = 'none';
        }
        break;
      case 3:
        if (Section_1 && Section_3 && Section_1_2) {
          Section_1.style.display = 'none';
          Section_1_2.style.display = 'none';
          Section_3.style.display = 'flex';
        }
        break;
      default:
        break;
    }
    if (Error_Display_1 && Error_Display_2) {
      Error_Display_1.style.display = 'none';
      Error_Display_2.style.display = 'none';
    }
    this.error1 = '';
    this.error2 = '';
  }
  Verificar_y_cambiar_interfaz(section: number): void {
    var Error_Display_1 = document.getElementById('Error_Display_1_modificar');
    var Error_Display_2 = document.getElementById('Error_Display_2_modificar');
    switch (section) {
      case 1:
        var flag_area_exist = false;
        for (let i = 0; i < this.Array_All_Areas.length; i++) {
          if (this.Modificar.get('nombre_area').value === this.Array_All_Areas[i]) {
            flag_area_exist = true;
          }
        }
        if (
          this.Modificar.get('nombre_area').value.length > 5 &&
          this.Modificar.get('descripcion').value.length > 5 &&
          !flag_area_exist
        ) {
          this.Cambio_Interfaz(2);
        } else {
          if (this.Modificar.get('nombre_area').value.length < 6) {
            this.error1 = 'Error: Longitud de nombre inválida';
            if (Error_Display_1) {
              Error_Display_1.style.display = 'flex';
            }
          }
          if (this.Modificar.get('descripcion').value.length < 6) {
            this.error1 = 'Error: Longitud de descripción inválida';
            if (Error_Display_1) {
              Error_Display_1.style.display = 'flex';
            }
          }
          if (flag_area_exist) {
            this.error1 = 'Error: Ya existe un área con el mismo nombre.';
            if (Error_Display_1) {
              Error_Display_1.style.display = 'flex';
            }
          }
        }
        break;
      case 2:
        if (this.Modificar.get('codigo_verif_2').value.length < 8) {
          this.error2 = '¡Código de Verificación Inválido!';
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        } else {
        if (this.Modificar.get('codigo_verif_2').value === this.Codigo_Verificacion_Email) {
          this.Nombre_area = this.Modificar.get('nombre_area').value;
          this.Descripcion = this.Modificar.get('descripcion').value;
          this.Email = this.Modificar.get('email').value;
          this.Cambio_Interfaz(3);
        } else {
          this.error2 = '¡El Código de Verificación es Incorrecto!'
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        }
      }
        if (this.Modificar.get('email').value.length < 5) {
          this.error2 = '¡Ingresa tu Email y Envía el Código!'
          console.log('Email Vacio');
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        }
        break;
      default:
        break;
    }
  }
  Cambio_En_Email(): void {
    this.Codigo_Enviado = false;
  }
  NavigateToBack() {
    this.router.navigate(['/Super-Admin']);
  }
  Enviar_Email_Verificacion(): void {
    this.dataService.Verificacion_de_Mail(this.Modificar.value).subscribe(data => {

    })
    var Send_Email = document.getElementById('Correo_Enviado_Exito_2');
    if (Send_Email) {
      Send_Email.style.display = 'flex';
    }
    this.Codigo_Enviado = true;
}
generarCodigo(longitud: number): string {
  const caracteres: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codigo: string = '';
  // Obtener la longitud total de la cadena de caracteres
  const caracteresLongitud: number = caracteres.length;
  // Generar el código alfanumérico
  for (let i = 0; i < longitud; i++) {
    // Obtener un carácter aleatorio de la cadena de caracteres
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLongitud));
  }
  return codigo;
}
ConfirmarData(): void {
  this.Resultado_Creacion = 'Modificando área de destinación...';
  var Btn = document.getElementById('Confirmar_Modificar_Area_Btn');
  var Result = document.getElementById('Container_Results_Modificar_Area');
  var Loader = document.getElementById('Loader_Modificar');
  var Exito = document.getElementById('Exito_Logo_Modificar');
  var Btn_V = document.getElementById('Btn_2_volver_super_admin');
  if (Btn && Result && Loader) {
    Result.style.display = 'flex';
    Btn.style.display = 'none';
    Loader.style.display = 'flex';
  }
  this.dataService.Modificar_Destinacion(this.Modificar.value).subscribe(data=>{
    setTimeout(() => {
      this.Resultado_Creacion = '¡Area de destinación modificada con éxito!';
      if (Loader && Exito && Btn_V) {
        Loader.style.display = 'none';
        Exito.style.display = 'flex';
        Btn_V.style.display = 'flex';
      }
    }, 3000);
  })
}
}
