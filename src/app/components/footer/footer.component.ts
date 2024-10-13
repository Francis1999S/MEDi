import { JsonpInterceptor } from '@angular/common/http';
import { Component } from '@angular/core';
import { CustomService } from '../../custom.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  constructor(public custom: CustomService){}

RedirectTo(url: string): void {
  window.open(url, '_blank');
}
}
