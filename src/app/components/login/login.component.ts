import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { loginGuard_2 } from '../../guards/login_2.guard';
import { loginGuard_3 } from '../../guards/login_3.guard';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  credenciales: any;
  Mensaje_Error: string = 'Administradores';
  constructor(private http: HttpClient, private dataService: DataService, private router: Router, public fb: FormBuilder){
    this.credenciales = this.fb.group({
      user: [''],
    });
  }
  ngOnInit(): void {
    if ([loginGuard_2]) {
      this.CBiRh9rO9rWuph30IiHfCtebLItxfqj1ouV6QbYJtOMqt9X();
    }
    if ([loginGuard_3]) {
      this.vOs80FGFjHJIOkgTVa93iDb7Yu1TW0Q3IZkwrVRzf8sgtSK();
    }
  }

  LogIn(): void {
    this.Mensaje_Error = 'Administradores';
    var error_text = document.getElementById('h1_error');
    if (error_text) {
     error_text.style.color = 'rgb(50, 50, 50)';
    }
    var Loader = document.getElementById('Loader_LogIn');
    var Btn = document.getElementById('Btn_submit_LogIn');
    if (this.credenciales.valid) {
      if (Loader && Btn) {
        Loader.style.display = 'flex';
        Btn.style.display = 'none';
      }
      const data = this.credenciales.value
      this.dataService.LogIn1(data).subscribe(respuesta => {
        if (respuesta.hasOwnProperty('Tcgqt7LmvbzxQVpP2xu0')) {
          if (respuesta.Tcgqt7LmvbzxQVpP2xu0) {
            this.dataService.User_Name = respuesta.nombre;
            this.dataService.User_Save = respuesta.user;
            this.dataService.User_Rol = respuesta.rol;
            this.dataService.LogIn_1 = true;
            this.XKl1PupBGLgHE9quJk6XwSB8pdSIfmj6imkudh();
          } else {
            if (Loader && Btn) {
              Loader.style.display = 'none';
              Btn.style.display = 'flex';
            }
           this.Mensaje_Error = 'Usuario Inexistente';
           var error_text = document.getElementById('h1_error');
           if (error_text) {
            error_text.style.color = 'red';
           }
          }
        }
      })
    } else {
      var Input1 = document.getElementById('Input_user');
      if ((this.credenciales.get('user').value === '')) {
        if (Input1) {
          Input1.style.borderColor = 'red';
          this.Mensaje_Error = 'Campos inválidos';
          var error_text = document.getElementById('h1_error');
          if (error_text) {
           error_text.style.color = 'red';
          }
        }
      }
    }
  }
  CBiRh9rO9rWuph30IiHfCtebLItxfqj1ouV6QbYJtOMqt9X() {
    this.router.navigate(['/Admin-Home']);
  }
  vOs80FGFjHJIOkgTVa93iDb7Yu1TW0Q3IZkwrVRzf8sgtSK() {
    this.router.navigate(['/Super-Admin']);
  }
  XKl1PupBGLgHE9quJk6XwSB8pdSIfmj6imkudh() {
    this.router.navigate(['/LogIn-Pass']);
  }
  navigateToHome() {
    this.router.navigate(['/Home']);
  }  
  handleFocus(): void {
    var Label = document.getElementById('Label_User');
    if (Label) {
      Label.style.transform = 'translate(0,-50px)';
      Label.style.color = 'rgb(150,150,150)';
      Label.style.fontSize = '90%';
    }
  }
  handleFocus2(): void {
    var Label = document.getElementById('Label_Pass');
    if (Label) {
      Label.style.transform = 'translate(0,-50px)';
      Label.style.color = 'rgb(150,150,150)';
      Label.style.fontSize = '90%';
    }
  }
}
