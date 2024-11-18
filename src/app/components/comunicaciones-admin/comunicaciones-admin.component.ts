import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { CustomService } from '../../custom.service';
import { FormBuilder } from '@angular/forms';
import * as L from 'leaflet';

@Component({
  selector: 'app-comunicaciones-admin',
  templateUrl: './comunicaciones-admin.component.html',
  styleUrl: './comunicaciones-admin.component.css'
})
export class ComunicacionesAdminComponent implements OnInit {

  Array_Comunicaciones: any;
  Array_Filtrado: any;
  Array_Filtrado_Areas: any;

  V_COMUNICACION: boolean = false;

  Dash_Form: any;

  Titulo_Filtro: string = 'Área: Mostrando Todo';
  Titulo_Filtro_2: string = 'Estado: Todos';
  Titulo_Filtro_3: string = 'Orden: Más Recientes';

  Index: number = 0;

  MAP_EXT: boolean = false;

  MAP_INJECTED: boolean = false;

  Array_Areas_Select: any;
  AREA_INDEX: number = 0;

  FILTER_KEY_1: number = 5;
  FILTER_KEY_2: number = -1;
  FILTER_KEY_3: number = 0;

  FILTRO_RAPIDO: boolean = false;



  constructor(private DS: DataService, public custom: CustomService, public fb: FormBuilder){
    this.Dash_Form = this.fb.group({
      key: [''],
      key2: [''],
      key3: ['']
    })
  }

  ngOnInit(): void {
    this.custom.G_LOADER = true;
    this.DS.GetAllAreas().subscribe(res=> {
      this.Array_Areas_Select = res;
    }, error => {
      alert('Error en el Servidor. Inténtelo de nuevo más tarde.');
    });
    this.DS.GetGlobalStatistics().subscribe(res=> {
      // 0: Demorado -- 1: Iniciado -- 2: Pendiente -- 3: Resuelto
      console.log(res);
      console.log(res[0].total);
      console.log(res[1].total);
      console.log(res[2].total);
      console.log(res[3].total);
      this.DS.GetAllReclamos2().subscribe(res2=> {
        this.Array_Comunicaciones = res2;
        this.Array_Filtrado = res2;
        this.Array_Filtrado_Areas = res2;
        this.custom.G_LOADER = false;
      }, error => {
        alert('Error en el Servidor. Inténtelo de nuevo más tarde.');
        this.custom.G_LOADER = false;
      })
 
    }, error => {
      alert('Error en el Servidor. Inténtelo de nuevo más tarde.');
      this.custom.G_LOADER = false;
    });
  }

  Filtrar_Comunicaciones(): void {
    if (this.FILTRO_RAPIDO) {
      this.FILTRO_RAPIDO = false;
      var key = this.FILTER_KEY_1.toString();
      switch (key) {
        case '1':
          this.Titulo_Filtro_2 = 'Estado: Pendientes';
          this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Pendiente');
          break;
          case '2':
                 this.Titulo_Filtro_2 = 'Estado: Iniciados';
            this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Iniciado');
          break;
          case '3':
                 this.Titulo_Filtro_2 = 'Estado: Demorados';
            this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Demorado');
          break;
          case '4':
                 this.Titulo_Filtro_2 = 'Estado: Resueltos';
            this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Resuelto');
          break;
          case '5':
                 this.Titulo_Filtro_2 = 'Estado: Todos';
            this.Array_Filtrado = this.Array_Filtrado_Areas;
          break;
        default:
          break;
      }
    } else {
      setTimeout(() => {
        var key = this.Dash_Form.get('key').value;
        this.FILTER_KEY_1 = key;
        switch (key) {
          case '1':
            this.Titulo_Filtro_2 = 'Estado: Pendientes';
            this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Pendiente');
            break;
            case '2':
                   this.Titulo_Filtro_2 = 'Estado: Iniciados';
              this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Iniciado');
            break;
            case '3':
                   this.Titulo_Filtro_2 = 'Estado: Demorados';
              this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Demorado');
            break;
            case '4':
                   this.Titulo_Filtro_2 = 'Estado: Resueltos';
              this.Array_Filtrado = this.Array_Filtrado_Areas.filter(comun => comun.estado == 'Resuelto');
            break;
            case '5':
                   this.Titulo_Filtro_2 = 'Estado: Todos';
              this.Array_Filtrado = this.Array_Filtrado_Areas;
            break;
          default:
            break;
        }
      }, 100);
    }

  }

  Filtrar_Comunicaciones2(): void {
    setTimeout(() => {
      var key = this.Dash_Form.get('key2').value;
      this.FILTER_KEY_2 = key;
      if (key < 0) {
        this.Titulo_Filtro = 'Área: Mostrando Todo';
        this.FILTRO_RAPIDO = true;
        this.Array_Filtrado = this.Array_Comunicaciones;
        this.Array_Filtrado_Areas = this.Array_Comunicaciones;
        this.Dash_Form.patchValue({key: this.FILTER_KEY_1, key3: this.FILTER_KEY_3});
        this.Filtrar_Comunicaciones();
        this.Filtrar_Comunicaciones3();
      } else {
        this.FILTRO_RAPIDO = true;
        this.Titulo_Filtro = 'Área: ' + this.Array_Areas_Select[key].nombre_area;
        this.Array_Filtrado = this.Array_Comunicaciones.filter(comun => comun.destinacion == this.Array_Areas_Select[key].clave_poder);
        this.Array_Filtrado_Areas = this.Array_Comunicaciones.filter(comun => comun.destinacion == this.Array_Areas_Select[key].clave_poder);
        this.Dash_Form.patchValue({key: this.FILTER_KEY_1, key3: this.FILTER_KEY_3});
        console.log(this.FILTER_KEY_1, this.FILTER_KEY_3);
        this.Filtrar_Comunicaciones();
        this.Filtrar_Comunicaciones3();
      }
    }, 100); 
  }

  Filtrar_Comunicaciones3(): void {
    if (this.FILTRO_RAPIDO) {
      this.FILTRO_RAPIDO = false;
        if (this.FILTER_KEY_1 == 0) {
          this.Titulo_Filtro_3 = 'Orden: Más Recientes';
          this.Array_Filtrado.sort((a, b) => b.id - a.id);
        } else {
          this.Titulo_Filtro_3 = 'Orden: Más Antiguos';
          this.Array_Filtrado.sort((a, b) => a.id - b.id);
        }
    } else {
      setTimeout(() => {
        var key = this.Dash_Form.get('key3').value;
        this.FILTER_KEY_3 = key;
        if (key == 0) {
          this.Titulo_Filtro_3 = 'Orden: Más Recientes';
          this.Array_Filtrado.sort((a, b) => b.id - a.id);
        } else {
          this.Titulo_Filtro_3 = 'Orden: Más Antiguos';
          this.Array_Filtrado.sort((a, b) => a.id - b.id);
        }
      }, 100);
    }

  }

  VisualizarComunicacion(index: number): void {
    this.Index = index;
    if (this.V_COMUNICACION) {
      this.V_COMUNICACION = false;
      this.Remove_Element();
    } else {
      this.V_COMUNICACION = true;
    }
  }

  OpenMap(): void {
    var MAP = document.getElementById('MAP_4214241412');
    if (this.MAP_EXT) {
      this.MAP_EXT = false;
      MAP.style.height = '0px';
    } else {
      this.MAP_EXT = true;
      MAP.style.height = '500px';
      if (!this.MAP_INJECTED) {
        if (this.Array_Filtrado[this.Index].ubicacion_2.length > 0) {
          const regex = /LatLng\((-?\d+\.\d+), (-?\d+\.\d+)\)/;
          const matches = this.Array_Filtrado[this.Index].ubicacion_2.match(regex);
          if (matches && matches.length === 3) {
            this.DS.Latitud = parseFloat(matches[1]);
            this.DS.Longitud = parseFloat(matches[2]);
          }
          setTimeout(() => {
            this.Map_Inject_2();
          }, 500);
          
        }
      }

    }
 
  }

  Map_Inject_2(): void {
    this.MAP_INJECTED = true;
    var NewMap = document.createElement('div');
    NewMap.id = 'map_25';
    var ContainerMap = document.getElementById('MAP_4214241412');
    if (ContainerMap) {
      ContainerMap.appendChild(NewMap);
    }
    var Map_Map = document.getElementById('map_25');
    if (Map_Map) {
      Map_Map.style.width = '100%';
      Map_Map.style.height = '100%';
      Map_Map.style.display = 'none';
    }
    setTimeout(() => {
      var Map_2 = document.getElementById('map_25');
      if (Map_2) {
        Map_2.style.display = 'flex';
      }
      const map2 = L.map('map_25').setView([this.DS.Latitud, this.DS.Longitud], 14);
      L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
      }).addTo(map2);
      var marker = L.marker([this.DS.Latitud, this.DS.Longitud]).addTo(map2);
    }, 500);
  }
  Remove_Element(): void {
    var Element = document.getElementById('map_25');
    if (Element) {
      Element.remove();
    }
    this.MAP_INJECTED = false;
  }

  RedirectTo(url: string): void {
    window.open(url, '_blank');
  }
}
