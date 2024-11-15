import { Component } from '@angular/core';
import { CustomService } from './custom.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'centro_reclamos_proyecto';
  constructor(public custom: CustomService){}
}
