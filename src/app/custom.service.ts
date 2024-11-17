import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  G_LOADER: boolean = false;

  NAV_MENU_CELLPHONE: boolean = true;

  src: string = '../../../MEDi/assets/';

  Versionado_Global_App: string = 'ver 1.1.0 - Noviembre 2024';

  constructor(private router: Router){}

  NavigateToVersion() {
   
      this.router.navigate(['/Version']);
 
  }
}
