import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, public G: CustomService){}
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
    this.router.navigate(['/Seguimiento/0']);
  }
}

