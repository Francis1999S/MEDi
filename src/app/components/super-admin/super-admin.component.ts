import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../data.service';
import { FormBuilder } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import * as L from 'leaflet';
import { CustomService } from '../../custom.service';

@Component({
  selector: 'app-super-admin',
  templateUrl: './super-admin.component.html',
  styleUrl: './super-admin.component.css'
})
export class SuperAdminComponent implements OnInit {

  Comunicaciones_Dinamicas_Row: any;

  Total_Resuelas: number = 0;

  Titulo_Dinamico: string = 'Cuentas de Usuarios';

  Datos_de_Areas_Permanente: any;
  Datos_de_Usuarios_Permanente: any;

  Registros_1: any[] = [];
  Registros_2: any[] = [];
  Registros_3: any[] = [];
  Registros_4: any[] = [];
  formatDate: string = '';
  formatTime: string = '';
  Contenido_PDF: string = '';
  Promedios: any[] = [];
  constructor(private router: Router, private dataService: DataService, public custom: CustomService){}
  ngOnInit(): void {
    this.Estadisticas_Loader_Detroy();
    var Loader = document.getElementById('Loader_Data_2');
    var Header = document.getElementById('Header_Desktop');
    if (Header) {
      Header.style.display = 'none';
    }
    this.dataService.GetAllUsers().subscribe(res1 => {
      this.dataService.GetAllAreas().subscribe(res2 => {
        this.Registros_1 = res1;
        this.Datos_de_Usuarios_Permanente = res1;
        this.Datos_de_Areas_Permanente = res2;
        if (Loader) {
          Loader.style.display = 'none';
        }
      })
    })
    
    this.dataService.GetGlobalStatistics().subscribe(data => {
      this.dataService.Pendientes = data[0].total_pendientes;
      this.dataService.Iniciados = data[0].total_iniciados;
      this.dataService.Demorados = data[0].total_demorados;
      this.dataService.Resueltos = data[0].total_resueltos;
      this.Total_Resuelas = data[0].total_resueltos;
    });
    this.dataService.Get_Reclamos_Pendientes().subscribe(res=> {
      var btn1 = document.getElementById('Button_Selector_SupAdm_1');
      var btn2 = document.getElementById('Button_Selector_SupAdm_2');
      var btn3 = document.getElementById('Button_Selector_SupAdm_3');
      var btn4 = document.getElementById('Button_Selector_SupAdm_4');
      if (btn1 && btn2 && btn3 && btn4) {
        btn1.style.borderBottom = '4px solid white';
        btn2.style.borderBottom = '4px solid rgba(0,0,0,0)';
        btn3.style.borderBottom = '4px solid rgba(0,0,0,0)';
        btn4.style.borderBottom = '4px solid rgba(0,0,0,0)';
      }
      this.Comunicaciones_Dinamicas_Row = res;
    });
  }
  NavigateToHome() {
    this.router.navigate(['/Home']);
    this.dataService.LogIn_1 = false;
    this.dataService.LogIn_2 = false;
    this.dataService.LogIn_3 = false;
  }
  NavigateToCreateArea() {
    this.router.navigate(['/Crear-Destinacion']);
  }

  Obtener_Comunicaciones(key: number): void {
    this.Comunicaciones_Dinamicas_Row = [];
    var Loader_Comun = document.getElementById('Comunicaciones_Loader_Super_Admin');
    if (Loader_Comun) {
      Loader_Comun.style.display = 'flex';
    }
    switch (key) {
      case 1:
        
        this.dataService.Get_Reclamos_Pendientes().subscribe(res=> {
          var btn1 = document.getElementById('Button_Selector_SupAdm_1');
          var btn2 = document.getElementById('Button_Selector_SupAdm_2');
          var btn3 = document.getElementById('Button_Selector_SupAdm_3');
          var btn4 = document.getElementById('Button_Selector_SupAdm_4');
          if (btn1 && btn2 && btn3 && btn4) {
            btn1.style.borderBottom = '4px solid white';
            btn2.style.borderBottom = '4px solid rgba(0,0,0,0)';
            btn3.style.borderBottom = '4px solid rgba(0,0,0,0)';
            btn4.style.borderBottom = '4px solid rgba(0,0,0,0)';
          }
          this.Comunicaciones_Dinamicas_Row = res;
          if (Loader_Comun) {
            Loader_Comun.style.display = 'none';
          }
        });
        break;
        case 2:
          this.dataService.Get_Reclamos_Iniciados().subscribe(res=> {
          var btn1 = document.getElementById('Button_Selector_SupAdm_1');
          var btn2 = document.getElementById('Button_Selector_SupAdm_2');
          var btn3 = document.getElementById('Button_Selector_SupAdm_3');
          var btn4 = document.getElementById('Button_Selector_SupAdm_4');
          if (btn1 && btn2 && btn3 && btn4) {
            btn1.style.borderBottom = '4px solid rgba(0,0,0,0)';
            btn2.style.borderBottom = '4px solid white';
            btn3.style.borderBottom = '4px solid rgba(0,0,0,0)';
            btn4.style.borderBottom = '4px solid rgba(0,0,0,0)';
          }
          this.Comunicaciones_Dinamicas_Row = res;
          if (Loader_Comun) {
            Loader_Comun.style.display = 'none';
          }
          });
        break;
        case 3:
          this.dataService.Get_Reclamos_Demorados().subscribe(res=> {
            var btn1 = document.getElementById('Button_Selector_SupAdm_1');
            var btn2 = document.getElementById('Button_Selector_SupAdm_2');
            var btn3 = document.getElementById('Button_Selector_SupAdm_3');
            var btn4 = document.getElementById('Button_Selector_SupAdm_4');
            if (btn1 && btn2 && btn3 && btn4) {
              btn1.style.borderBottom = '4px solid rgba(0,0,0,0)';
              btn2.style.borderBottom = '4px solid rgba(0,0,0,0)';
              btn3.style.borderBottom = '4px solid white';
              btn4.style.borderBottom = '4px solid rgba(0,0,0,0)';
            }
          this.Comunicaciones_Dinamicas_Row = res;
          if (Loader_Comun) {
            Loader_Comun.style.display = 'none';
          }
          });
        break;
        case 4:
          this.dataService.Get_Reclamos_Resueltos().subscribe(res=> {
            var btn1 = document.getElementById('Button_Selector_SupAdm_1');
            var btn2 = document.getElementById('Button_Selector_SupAdm_2');
            var btn3 = document.getElementById('Button_Selector_SupAdm_3');
            var btn4 = document.getElementById('Button_Selector_SupAdm_4');
            if (btn1 && btn2 && btn3 && btn4) {
              btn1.style.borderBottom = '4px solid rgba(0,0,0,0)';
              btn2.style.borderBottom = '4px solid rgba(0,0,0,0)';
              btn3.style.borderBottom = '4px solid rgba(0,0,0,0)';
              btn4.style.borderBottom = '4px solid white';
            }
          this.Comunicaciones_Dinamicas_Row = res;
          if (Loader_Comun) {
            Loader_Comun.style.display = 'none';
          }
          });
        break;
      default:
        break;
    }
  }

  AreasDisplay(): void {
    this.Registros_1 = [];
    this.Registros_2 = [];
    this.Registros_3 = [];
    this.Titulo_Dinamico = 'Acceder a Áreas de Destino';
    var Resumen_Document = document.getElementById('Resumen_Global');
    if  (Resumen_Document) {
      Resumen_Document.style.display = 'none';
    }
      this.Registros_2 = this.Datos_de_Areas_Permanente;
  }

  AreasDisplay_2(): void {
    this.Registros_1 = [];
    this.Registros_2 = [];
    this.Registros_3 = [];
    this.Registros_3 = [];
    this.Titulo_Dinamico = 'Modificar Áreas de Destino';
    var Resumen_Document = document.getElementById('Resumen_Global');
    if (Resumen_Document) {
      Resumen_Document.style.display = 'none';
    }
      this.Registros_3 = this.Datos_de_Areas_Permanente;
  }

  UsuariosDisplay(): void {
    this.Registros_1 = [];
    this.Registros_2 = [];
    this.Registros_3 = [];
    this.Registros_3 = [];
    this.Titulo_Dinamico = 'Visualizando Credenciales de Usuarios';
    var Resumen_Document = document.getElementById('Resumen_Global');
    if ( Resumen_Document) {
      Resumen_Document.style.display = 'none';
    }
      this.Registros_1 = this.Datos_de_Usuarios_Permanente;
  }

  Estadisticas_Loader_Detroy(): void {
    var Loader = document.getElementById('Estadisticas_Loader_2');
    setTimeout(() => {
      if (Loader) {
        Loader.remove();
      }
    }, 2900);

  }
  Entry_Area(clave: string): void {
      this.dataService.Clave_Poder = clave;
      this.xFDkkr2JAG5yyDkPWtITLsIE9HDKQ1lZ8YBdEZmRLV4d7Im776zgcqjsD6YkOgbz();
  }
  xFDkkr2JAG5yyDkPWtITLsIE9HDKQ1lZ8YBdEZmRLV4d7Im776zgcqjsD6YkOgbz() {
    this.router.navigate(['/Admin-Home']);
  }
  Modificar_Area(clave_poder: string): void {
    this.dataService.Clave_Poder_Modificacion = clave_poder;
    this.router.navigate(['/Modificar-Destinacion']);
  }
  formatDate_1(date: Date): string {
    // Formato YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
  
  formatTime_2(date: Date): string {
    // Formato HH:mm:ss
    return date.toTimeString().split(' ')[0];
  }

  Resumen_Mensual():void {
    const now = new Date();
    this.formatDate = this.formatDate_1(now);
  this.formatTime = this.formatTime_2(now);
    this.Titulo_Dinamico = 'Resumen Actualizado';
    this.Registros_1 = [];
    this.Registros_2 = [];
    this.Registros_3 = [];
    this.Registros_4 = [];
    var Resumen_Document = document.getElementById('Resumen_Global');
    var Loader = document.getElementById('Loader_Data_2');
    if (Loader && Resumen_Document) {
      Loader.style.display = 'flex';
      Resumen_Document.style.display = 'flex';
    }
    this.dataService.GetAllAreas().subscribe(res => {
      this.Registros_4 = res;
for (let l = 0; l < this.Registros_4.length; l++) {
  this.Registros_4[l].promedio = '';
}
      this.dataService.Get_Suma_Promedios_Areas().subscribe(data=> {
        for (let g = 0; g < data.length; g++) {
          for (let j = 0; j < this.Registros_4.length; j++) {
            if (this.Registros_4[j].clave_poder === data[g].destinacion) {
              this.Registros_4[j].promedio = data[g].promedio_contador_dias + ' días';
            }
          }
        }
        for (let n = 0; n < this.Registros_4.length; n++) {
          if (this.Registros_4[n].promedio === '') {
            this.Registros_4[n].promedio = 'Sin Resueltos';
          }
        }
        for (let i = 0; i < this.Registros_4.length; i++) {
          
          this.Contenido_PDF += this.Registros_4[i].nombre_area + ':\n__________________________________________________________________________________________________________________\n'+'              Pendientes: ' + this.Registros_4[i].pendientes + '              Iniciados: ' + this.Registros_4[i].iniciados + '              Demorados: ' + this.Registros_4[i].demorados + '              Resueltos: ' + this.Registros_4[i].resueltos  + '\n\nTiempo Promedio de Resolución: ' + this.Registros_4[i].promedio + '\n\n\n\n';
        }
        if (Loader) {
          Loader.style.display = 'none';
        }
      })
    })

  }
   ////////////////////////Generador de PDFs////////////////////////////
   generarPDF() {
    const documentDefinition = {
      content: [

        {
          text: 'Resumen Actualizado de Estados\n\n',
          style: 'header',
          alignment: 'center'
        },
        {
          text: 'Counsultado en fecha: ' + this.formatDate + '\n',
          style: 'small4',
          alignment: 'left'
        },
        {
          text: 'Hora: ' + this.formatTime + '\n\n',
          style: 'small4',
             alignment: 'left'
        },
        '\n\n',
        {
          text: this.Contenido_PDF + '\n\n',
          style: 'small2',
          alignment: 'left'
        },
        {
          text: 'Mesa de Entrada Digital MEDi',
          alignment: 'right',
          style: 'small'
        },
        {
          text: 'Tinogasta Municipio',
          alignment: 'right',
          style: 'small'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center'
        },
        subheader: {
          fontSize: 15,
          bold: true,
          alignment: 'center'
        },
        quote: {
          italics: true
        },
        small: {
          fontSize: 8
        },
        small2: {
          fontSize: 10
        },
        small3: {
          bold: true,
          fontSize: 10
        },
        small4: {
          fontSize: 9,
          alignment: 'right'
        }
      }
    };
    pdfMake.createPdf(documentDefinition).download('Resumen-de-Estados-MEDi-'+this.formatDate +'.pdf');
  }
}
