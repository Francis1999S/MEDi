import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomService } from '../../custom.service';

@Component({
  selector: 'app-headerphones',
  templateUrl: './headerphones.component.html',
  styleUrl: './headerphones.component.css'
})
export class HeaderphonesComponent {
  flag_menu: boolean = false;
  constructor(private router: Router, public custom: CustomService) { }
  navigateToHome() {
    this.router.navigate(['/Home']);
    var Menu = document.getElementById('Menu_Cellphones');
    if (Menu) {
      if (this.flag_menu) {
        Menu.style.opacity = '0';
        setTimeout(() => {
          if (Menu) {
            Menu.style.display = 'none';
          }
          this.flag_menu = false;
        }, 500);
      }
    }
  }
  navigateToLogin() {
    this.router.navigate(['/LogIn']);
    this.openMenu();
  }
  navigateToContacto() {
    this.router.navigate(['/Contacto']);
    this.openMenu();
  }
  navigateToAyuda() {
    this.router.navigate(['/Ayuda']);
    this.openMenu();
  }
  navigateTosSeguimiento() {
    this.router.navigate(['/Seguimiento/0']);
    this.openMenu();
  }
  navigateToEstadisticas() {
    this.router.navigate(['/Estadisticas']);
    this.openMenu();
  }
  openMenu(): void {
    var Menu = document.getElementById('Menu_Cellphones');
    if (Menu) {
      if (this.flag_menu) {
        Menu.style.opacity = '0';
        setTimeout(() => {
          if (Menu) {
            Menu.style.display = 'none';
          }
          this.flag_menu = false;
        }, 500);
      } else {
        this.flag_menu = true;
        Menu.style.display = 'flex';
        Menu.style.opacity = '1';
      }
    }
  }
}
