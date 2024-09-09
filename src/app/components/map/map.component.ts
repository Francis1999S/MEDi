import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataService } from '../../data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {
  constructor(private dataService: DataService) {}
  ngOnInit(): void {
      const map = L.map('map').setView([-28.065437, -67.56433], 14);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
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
