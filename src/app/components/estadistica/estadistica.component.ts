import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrl: './estadistica.component.css'
})
export class EstadisticaComponent implements OnInit {
  Estadisticas: any[] = [];
  N_resueltos: number = 0;
  constructor(private dataService: DataService){}
  ngOnInit(){
    this.dataService.GetGlobalStatistics().subscribe(data => {
      this.Estadisticas = data;
      this.N_resueltos = this.Estadisticas[0].total_resueltos;
      this.graphs();
    })
  }
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  graphs(){
    this.canvas = this.mychart.nativeElement;
this.ctx = this.canvas.getContext('2d');
new Chart(this.ctx, {
  type: 'pie',
  data: {
    labels: ['Pendientes','Iniciados','Demorados'],
    datasets: [{
      label: 'Gráfico de Prueba',
      data: [this.Estadisticas[0].total_pendientes, this.Estadisticas[0].total_iniciados, this.Estadisticas[0].total_demorados],
      backgroundColor: [
        'rgba(255, 245, 53, 0.2)',
        'rgba(90, 100, 211, 0.2)',
        'rgba(240, 70, 79, 0.2)'
      ],
      borderColor: [
        'rgb(151, 143, 0)',
        'rgb(46, 55, 171)',
        'rgb(173, 14, 22)'
      ],
      borderWidth: 1
    }]
  }
})
}
}