import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-crear-destinacion',
  templateUrl: './crear-destinacion.component.html',
  styleUrl: './crear-destinacion.component.css',
})
export class CrearDestinacionComponent implements OnInit {
  Resultado_Creacion: string = '';
  error1: string = '';
  error2: string = '';
  error3: string = '';
  nueva_area: any;
  Email_Verificado: boolean = false;
  Codigo_Verificacion_Email: string = '';
  Codigo_Enviado: boolean = false;

  ////////Array de Usuarios Existentes/////////////
Array_All_Users: string[] = [];

  ///////////Manejo de Errores por Mensaje/////////////

  constructor(
    private dataService: DataService,
    public fb: FormBuilder,
    private router: Router
  ) {
    this.nueva_area = this.fb.group({
      nombre_area: [''],
      descripcion: [''],
      user: [''],
      pass: [''],
      pass2: [''],
      clave_poder: [''],
      rol: [''],
      nombre: [''],
      iniciados: [''],
      demorados: [''],
      resueltos: [''],
      eliminados: [''],
      email: [''],
      codigo_verif: [''],
      codigo_verif_2: ['']
    });
  }
  ngOnInit(): void {
    this.Codigo_Verificacion_Email = this.generarCodigo(8);
    this.nueva_area.patchValue({ codigo_verif: this.Codigo_Verificacion_Email});
    this.Cambio_Interfaz(1);
    this.dataService.GetAllUsers().subscribe(data=> {
      for (let i = 0; i < data.length; i++) {
        this.Array_All_Users.push(data[i].user);
      }
    })
  }
  Nombre_area: string = '';
  Descripcion: string = '';
  User: string = '';
  Password: string = '';

  Cambio_Interfaz(interfaz: number): void {
    var Section_1 = document.getElementById('Create_Area_Container_1');
    var Section_1_2 = document.getElementById('Create_Area_Container_1_2');
    var Section_2 = document.getElementById('Create_Area_Container_2');
    var Section_3 = document.getElementById('Create_Area_Container_3');
    var Error_Display_1 = document.getElementById('Error_Display_Animation_1');
    var Error_Display_2 = document.getElementById('Error_Display_Animation_2');
    var Error_Display_3 = document.getElementById('Error_Display_Animation_3');
    switch (interfaz) {
      case 1:
        if (Section_1 && Section_2 && Section_3 && Section_1_2) {
          Section_1.style.display = 'flex';
          Section_1_2.style.display = 'none';
          Section_2.style.display = 'none';
          Section_3.style.display = 'none';
        }
        break;
      case 2:
        if (Section_1 && Section_2 && Section_3 && Section_1_2) {
          Section_1.style.display = 'none';
          Section_1_2.style.display = 'flex';
          Section_2.style.display = 'none';
          Section_3.style.display = 'none';
        }
        break;
      case 3:
        if (Section_1 && Section_2 && Section_3 && Section_1_2) {
          Section_1.style.display = 'none';
          Section_1_2.style.display = 'none';
          Section_2.style.display = 'flex';
          Section_3.style.display = 'none';
        }
        break;
      case 4:
        if (Section_1 && Section_2 && Section_3 && Section_1_2) {
          Section_1.style.display = 'none';
          Section_1_2.style.display = 'none';
          Section_2.style.display = 'none';
          Section_3.style.display = 'flex';
        }
        break;
      default:
        break;
    }
    if (Error_Display_1 && Error_Display_2 && Error_Display_3) {
      Error_Display_1.style.display = 'none';
      Error_Display_2.style.display = 'none';
      Error_Display_3.style.display = 'none';
    }
    this.error1 = '';
    this.error2 = '';
    this.error3 = '';
  }
  Cambio_En_Email(): void {
    this.Codigo_Enviado = false;
  }
  Verificar_y_cambiar_interfaz(section: number): void {
    var Error_Display_1 = document.getElementById('Error_Display_Animation_1');
    var Error_Display_2 = document.getElementById('Error_Display_Animation_2');
    var Error_Display_3 = document.getElementById('Error_Display_Animation_3');
    switch (section) {
      case 1:
        if (
          this.nueva_area.get('nombre_area').value.length > 5 &&
          this.nueva_area.get('descripcion').value.length > 5
        ) {
          this.Cambio_Interfaz(2);
        } else {
          this.error1 = 'Campos Inválidos';
          if (Error_Display_1) {
            Error_Display_1.style.display = 'flex';
          }
        }
        break;
      case 2:
        if (this.nueva_area.get('codigo_verif_2').value.length < 8) {
          this.error2 = '¡Código de Verificación Inválido!'
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        } else {
        if (this.nueva_area.get('codigo_verif_2').value === this.Codigo_Verificacion_Email) {
          this.Cambio_Interfaz(3);

        } else {
          this.error2 = '¡El Código de Verificación es Incorrecto!'
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        }
      }
        if (this.nueva_area.get('email').value.length < 5) {
          this.error2 = '¡Ingresa tu Email y Envía el Código!'
          console.log('Email Vacio');
          if (Error_Display_2) {
            Error_Display_2.style.display = 'flex';
          }
        }
        break;
      case 3:
        var flag_user_exist = false;
        for (let i = 0; i < this.Array_All_Users.length; i++) {
          if (this.nueva_area.get('user').value === this.Array_All_Users[i]) {
            flag_user_exist = true;
          }
        }
        if (flag_user_exist === false && this.nueva_area.get('pass').value.length > 7 && this.nueva_area.get('pass').value === this.nueva_area.get('pass2').value && !(this.nueva_area.get('pass').value.indexOf(' ') !== -1) && !(this.nueva_area.get('user').value.length < 5) && !(this.nueva_area.get('user').value.indexOf(' ') !== -1)) {
          this.Nombre_area = this.nueva_area.get('nombre_area').value;
          this.Descripcion = this.nueva_area.get('descripcion').value;
          this.User = this.nueva_area.get('user').value;
          this.Password = this.nueva_area.get('pass').value;
          this.Cambio_Interfaz(4);
        } else {
          var Error_Display_3 = document.getElementById('Error_Display_Animation_3');
          if (Error_Display_3) {
            Error_Display_3.style.display = 'flex';
          }
          this.error3 = 'Error: Su contraseña no coincide';
          if (this.nueva_area.get('pass').value.indexOf(' ') !== -1) {
            this.error3 = 'Error: Su contraseña no puede contener espacios';
            if (Error_Display_3) {
              Error_Display_3.style.display = 'flex';
            }
          }
          if (this.nueva_area.get('user').value.indexOf(' ') !== -1) {
            this.error3 = 'Error: Su usuario no puede contener espacios';
            if (Error_Display_3) {
              Error_Display_3.style.display = 'flex';
            }
          }
          if (this.nueva_area.get('user').value.length < 5) {
            this.error3 = 'Error: Longitud de usuario inválida';
            if (Error_Display_3) {
              Error_Display_3.style.display = 'flex';
            }
          }
          if (this.nueva_area.get('pass').value.length < 8) {
            this.error3 = 'Error: Longitud de contraseña inválida';
            if (Error_Display_3) {
              Error_Display_3.style.display = 'flex';
            }
          }
          if (flag_user_exist) {
            this.error3 = 'Error: El usuario ya existe';
            if (Error_Display_3) {
              Error_Display_3.style.display = 'flex';
            }
          }
        }
        break;
      default:
        break;
    }
  }
  NavigateToBack() {
    this.router.navigate(['/Super-Admin']);
  }
  Enviar_Email_Verificacion(): void {
    this.dataService.Verificacion_de_Mail(this.nueva_area.value).subscribe(data => {

    })
    var Send_Email = document.getElementById('Correo_Enviado_Exito');
    if (Send_Email) {
      Send_Email.style.display = 'flex';
    }
    this.Codigo_Enviado = true;
  }
  ConfirmarData(): void {
    this.nueva_area.patchValue({ iniciados: 0 });
    this.nueva_area.patchValue({ demorados: 0 });
    this.nueva_area.patchValue({ resueltos: 0 });
    this.nueva_area.patchValue({ eliminados: 0 });
    this.nueva_area.patchValue({ nombre: 'Usuario Administrador' });
    this.nueva_area.patchValue({ rol: 'Recepcionar y Administrar las comunicaciones destinadas a ' + this.Nombre_area });
    const New_Code: string = this.generarCodigo(15);
    this.nueva_area.patchValue({ clave_poder: New_Code });
    this.Resultado_Creacion = 'Creando nueva área de destinación...';
    var Btn = document.getElementById('Confirmar_Crear_Area_Btn');
    var Result = document.getElementById('Container_Results_Creating_Area');
    var Loader = document.getElementById('Loader_Creation');
    var Exito = document.getElementById('Exito_Logo');
    var Btn_V = document.getElementById('Btn_volver_super_admin');
    if (Btn && Result && Loader) {
      Result.style.display = 'flex';
      Btn.style.display = 'none';
      Loader.style.display = 'flex';
    }
    this.dataService.InsertArea(this.nueva_area.value).subscribe(Response => {
      this.dataService.InsertUsuario(this.nueva_area.value).subscribe(Response2 => {
        setTimeout(() => {
          this.Resultado_Creacion = '¡Nueva área de destinación creada con éxito!';
          if (Loader && Exito && Btn_V) {
            Loader.style.display = 'none';
            Exito.style.display = 'flex';
            Btn_V.style.display = 'flex';
          }
        }, 3000);
      })
    })
  }
  vOs80FGFjHJkgTVa93iDb7Yu1TW0Q3kwrVRzfgtSK() {
    this.router.navigate(['/Super-Admin']);
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

}
