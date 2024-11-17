import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrl: './bandeja-entrada.component.css'
})
export class BandejaEntradaComponent {

  Seguimiento: any;

  codigoSeguimiento: string;
  
  flag_error: boolean = false;

  Error_Mensaje: string;

  Comunicacion: any;

  constructor(private DS: DataService, public fb: FormBuilder, private route: ActivatedRoute){
    this.Seguimiento = this.fb.group({
      cod_conf: [''],
      estado: [''],
    });
  }
  ngOnInit(): void {
    // Suscríbete a los parámetros de la URL
    this.route.paramMap.subscribe((params: ParamMap) => {
      // Obtén el parámetro 'codigo' y conviértelo a número
      const codigo = params.get('codigo');
      if (codigo) {
        this.codigoSeguimiento = codigo; // El símbolo + convierte el string a number

        /// Busqueda de Comunicacion con codigo...
      } else {
        // Manejo de error o asignación de valor por defecto
        this.codigoSeguimiento = 'Nulo';
        this.flag_error = true;
      }
    });
  }

}