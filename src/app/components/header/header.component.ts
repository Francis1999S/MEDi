import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router){}
  navigateToHome() {
    this.router.navigate(['/Home']);
  }
  navigateToLogIn() {
    this.router.navigate(['/LogIn']);
  }
  navigateToAyuda() {
    this.router.navigate(['/Ayuda']);
  }
  navigateToContacto() {
    this.router.navigate(['/Contacto']);
  }
  navigateToEstadisticas() {
    this.router.navigate(['/Estadisticas']);
  }
  navigateTosSeguimiento() {
    this.router.navigate(['/Seguimiento']);
  }
}

