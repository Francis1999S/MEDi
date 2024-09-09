import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login2',
  templateUrl: './login2.component.html',
  styleUrl: './login2.component.css'
})
export class Login2Component {
  Title_User_Name: string = this.dataService.User_Name;
  Rol_User: string = this.dataService.User_Rol;
  credenciales2: any;
  Mensaje_Error: string = 'Administradores';
  constructor(private http: HttpClient, private dataService: DataService, private router: Router, public fb: FormBuilder){
    this.credenciales2 = this.fb.group({
      user: [''],
      pass: ['']
    });
  }
  LogIn_2(): void {
    this.Mensaje_Error = 'Administradores';
    var error_text = document.getElementById('h1_error');
    if (error_text) {
     error_text.style.color = 'rgb(50, 50, 50)';
    }
    var Loader = document.getElementById('Loader_LogIn');
    var Btn = document.getElementById('Btn_submit_LogIn');
    if (this.credenciales2.valid) {
      if (Loader && Btn) {
        Loader.style.display = 'flex';
        Btn.style.display = 'none';
      } 
    }
    this.credenciales2.patchValue({ user: this.dataService.User_Save });
    if (this.credenciales2.valid) {
    this.dataService.LogIn2(this.credenciales2.value).subscribe(respuesta => {
      if (respuesta.osVgR8BlDEwfxG292UrEMX5pJ7l7 && respuesta.wZpPywiGq3kjHTH8sKTe6qaGCVsw) {
       this.dataService.LogIn_2 = true;
       this.dataService.LogIn_3 = true;
       this.Poq0hZAF20U5FQKtgpoLBJG1MTvfbatrY69KCtDbOb20F5tYMTqt9UPaFtu0iEJm();
      } else if (respuesta.osVgR8BlDEwfxG292UrEMX5pJ7l7 && !respuesta.wZpPywiGq3kjHTH8sKTe6qaGCVsw) {
        this.dataService.Clave_Poder = respuesta.clave_poder;
        this.dataService.LogIn_2 = true;
        this.dataService.LogIn_3 = false;
        this.xFDkkr2JAG5yyDkPWtITLsIE9HDKQ1lZ8YBdEZmRLV4d7Im776zgcqjsD6YkOgbz();
      } else if (!respuesta.osVgR8BlDEwfxG292UrEMX5pJ7l7) {
        if (Loader && Btn) {
          Loader.style.display = 'none';
          Btn.style.display = 'flex';
        }
       this.Mensaje_Error = 'Contraseña Incorrecta';
       var error_text = document.getElementById('h1_error');
       if (error_text) {
        error_text.style.color = 'red';
       }
      }
    })
  } else {
    var Input1 = document.getElementById('Input_pass');
    if ((this.credenciales2.get('pass').value === '')) {
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
  oY4Tp3u7PfjyofOheVyRVAiMgPDTQKgqG9zQiZHVL3xdGf7qR01Ss10WXiBFqvwR() {
    this.router.navigate(['/LogIn']);
  }
  xFDkkr2JAG5yyDkPWtITLsIE9HDKQ1lZ8YBdEZmRLV4d7Im776zgcqjsD6YkOgbz() {
    this.router.navigate(['/Admin-Home']);
  }
  Poq0hZAF20U5FQKtgpoLBJG1MTvfbatrY69KCtDbOb20F5tYMTqt9UPaFtu0iEJm() {
    this.router.navigate(['/Super-Admin']);
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
