import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-estadistica-admin',
  templateUrl: './estadistica-admin.component.html',
  styleUrl: './estadistica-admin.component.css'
})
export class EstadisticaAdminComponent {
  constructor(private dataService: DataService){}
  ngOnInit(){}
  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit(){
    var Loader = document.getElementById('Loader_Estadisticas_Admin_Home');
    setTimeout(() => {
      if (Loader) {
        Loader.style.display = 'none';
      }
    this.canvas = this.mychart.nativeElement;
this.ctx = this.canvas.getContext('2d');
new Chart(this.ctx, {
  type: 'bar',
  data: {
    labels: ['Pendientes','Iniciados','Demorados','Resueltos', ''],
    datasets: [{
      label: 'Estados Actuales',
      data: [this.dataService.Pendientes, this.dataService.Iniciados, this.dataService.Demorados, this.dataService.Resueltos, 0],
      backgroundColor: [
        'rgba(255, 255, 0, 0.2)',
        'rgba(0, 255, 255, 0.2)',
        'rgba(255, 0, 0, 0.2)',
        'rgba(0, 255, 0, 0.2)',
        'rgba(0, 255, 0, 0)'
      ],
      borderColor: [
        'rgb(255, 255, 0)',
        'rgb(0, 255, 255)',
        'rgb(255, 0, 0)',
        'rgb(0, 255, 0)',
        'rgba(0, 255, 0, 0)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    title: {
      display: false,
      text: 'Estados Actuales',
      fontColor: 'white' // Cambia 'black' al color que desees para el título
    },
    legend: {
      labels: {
        fontColor: 'white' // Cambia 'black' al color que desees para la leyenda
      }
    },
    scales: {
      xAxes: [{
        ticks: {
          fontColor: 'white' // Cambia 'black' al color que desees para las etiquetas del eje X
        }
      }],
      yAxes: [{
        ticks: {
          fontColor: 'white' // Cambia 'black' al color que desees para las etiquetas del eje Y
        }
      }]
    }
  }
})
}, 3000);
}
}
