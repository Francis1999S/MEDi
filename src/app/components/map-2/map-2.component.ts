import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-map-2',
  templateUrl: './map-2.component.html',
  styleUrl: './map-2.component.css'
})
export class Map2Component {
  constructor(private dataService: DataService) {}
  coordenadas: any;
  ngOnInit(): void {
      const map = L.map('map').setView([-28.065437, -67.56433], 14);
      L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
    }).addTo(map);

    var popup = L.popup();
    const onMapClick = (e: any) => {
      this.dataService.coordenadas_map = e.latlng.toString();
        popup
            .setLatLng(e.latlng)
            .setContent("Ubicación")
            .openOn(map);
    }
    map.on('click', onMapClick.bind(this));
    var marker = L.marker([this.dataService.Latitud, this.dataService.Longitud]).addTo(map);
  }
}
