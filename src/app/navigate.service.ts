import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavigateService {

  constructor(private router: Router) { }

  ToHome() {
    this.router.navigate(['/Home']);
  }
  ToCreateArea() {
    this.router.navigate(['/Super-Admin/Crear-Destinacion']);
  }
}
