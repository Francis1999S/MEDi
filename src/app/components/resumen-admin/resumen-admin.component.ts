import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../custom.service';
import { NavigateService } from '../../navigate.service';
import { DataService } from '../../data.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-resumen-admin',
  templateUrl: './resumen-admin.component.html',
  styleUrl: './resumen-admin.component.css'
})
export class ResumenAdminComponent implements OnInit {

  Areas_Array: any;

  Contenido_PDF: string = '';
  formatDate: string = '';
  formatTime: string = '';

  constructor(public custom: CustomService, public navigate: NavigateService, private DS: DataService){}

  ngOnInit(): void {
    this.custom.G_LOADER = true;
    this.DS.GetAllAreas().subscribe(res => {
      console.log(res);
      this,this.Areas_Array = res;
      for (let l = 0; l < this.Areas_Array.length; l++) {
        this.Areas_Array[l].promedio = '';
      }
      this.DS.Get_Suma_Promedios_Areas().subscribe( res2 => {
        for (let g = 0; g < res2.length; g++) {
          for (let j = 0; j < this.Areas_Array.length; j++) {
            if (this.Areas_Array[j].clave_poder === res2[g].destinacion) {
              if (res2[g].promedio_contador_dias < 1) {
                this.Areas_Array[j].promedio = (res2[g].promedio_contador_dias * 24) + ' horas';
              } else {
                this.Areas_Array[j].promedio = res2[g].promedio_contador_dias + ' días';
              }
            }
          }
        }
        for (let n = 0; n < this.Areas_Array.length; n++) {
          if (this.Areas_Array[n].promedio === '') {
            this.Areas_Array[n].promedio = 'Sin comunicaciones resueltas';
          }
        }
        for (let i = 0; i < this.Areas_Array.length; i++) {
          this.Contenido_PDF += this.Areas_Array[i].nombre_area + ':\n__________________________________________________________________________________________________________________\n'+'              Pendientes: ' + this.Areas_Array[i].pendientes + '              Iniciados: ' + this.Areas_Array[i].iniciados + '              Demorados: ' + this.Areas_Array[i].demorados + '              Resueltos: ' + this.Areas_Array[i].resueltos  + '\n\nTiempo Promedio de Resolución: ' + this.Areas_Array[i].promedio + '\n\n\n\n';
        }
        this.custom.G_LOADER = false;
      });
    
    }, error => {
      this.custom.G_LOADER = false;
      alert('Error en el Servidor. Inténtelo de nuevo más tarde.');
    })
  }

  EntrarArea() {
    
  }

  formatDate_1(date: Date): string {
    // Formato YYYY-MM-DD
    return date.toISOString().split('T')[0];
  }
  formatTime_2(date: Date): string {
    // Formato HH:mm:ss
    return date.toTimeString().split(' ')[0];
  }
   ////////////////////////Generador de PDFs////////////////////////////
   generarPDF() {
    const now = new Date();
    this.formatDate = this.formatDate_1(now);
  this.formatTime = this.formatTime_2(now);
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
