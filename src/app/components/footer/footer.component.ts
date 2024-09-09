import { JsonpInterceptor } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
RedirectTo(url: string): void {
  window.open(url, '_blank');
}
}
