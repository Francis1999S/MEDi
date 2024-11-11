import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CustomService {

  src: string = '../../../MEDi/assets/';

  Versionado_Global_App: string = 'ver 1.0.1 2024';

  constructor(private router: Router){}

  NavigateToVersion() {
   
      this.router.navigate(['/Version']);
 
  }
}
