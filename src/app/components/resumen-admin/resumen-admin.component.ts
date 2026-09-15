import { Component, OnInit } from '@angular/core';
import { CustomService } from '../../custom.service';
import { NavigateService } from '../../navigate.service';
import { DataService } from '../../data.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
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

  OPTIONS_ACTIVE: boolean = false;
  INDEX_AREA: number = 0;

  CREDENCIALES_ACTIVE: boolean = false;

  INFO_ACTIVE: boolean = false;

  constructor(public custom: CustomService, public navigate: NavigateService, private DS: DataService, private router: Router) { }

  ngOnInit(): void {
    this.custom.G_LOADER = true;
    this.DS.GetAllAreas().subscribe(res => {
      console.log('Get all areas: ', res);
      this.Areas_Array = res;
      for (let l = 0; l < this.Areas_Array.length; l++) {
        this.Areas_Array[l].promedio = '';
      }
      this.DS.Get_Suma_Promedios_Areas().subscribe(res2 => {
        console.log('Get_Suma_Promedios_Areas: ', res2);
        for (let g = 0; g < res2.length; g++) {
          for (let j = 0; j < this.Areas_Array.length; j++) {
            if (this.Areas_Array[j].clave_poder === res2[g].destinacion) {

              // Función para convertir días decimales en un formato legible
              const formatTime = (decimalDays) => {
                const days = Math.floor(decimalDays); // Días completos
                const hoursDecimal = (decimalDays - days) * 24; // Horas decimales
                const hours = Math.floor(hoursDecimal); // Horas completas
                const minutesDecimal = (hoursDecimal - hours) * 60; // Minutos decimales
                const minutes = Math.round(minutesDecimal); // Minutos completos

                let result = '';
                if (days > 0) result += `${days} día${days > 1 ? 's' : ''}`;
                if (hours > 0) result += `${result ? ', ' : ''}${hours} hora${hours > 1 ? 's' : ''}`;
                if (minutes > 0) result += `${result ? ' y ' : ''}${minutes} minuto${minutes > 1 ? 's' : ''}`;
                return result || 'menos de 1 día';
              };

              // Calcular y asignar el promedio formateado para cada tipo
              this.Areas_Array[j].promedio = formatTime(res2[g].promedio_contador_dias_resuelto);
              this.Areas_Array[j].promedio_p = formatTime(res2[g].promedio_contador_dias_p);
              this.Areas_Array[j].promedio_g = formatTime(res2[g].promedio_general);
            }
            this.Areas_Array[j].procentaje_resueltos = (parseInt(this.Areas_Array[j].total_resueltos) / (parseInt(this.Areas_Array[j].total_pendientes) + parseInt(this.Areas_Array[j].total_iniciados) + parseInt(this.Areas_Array[j].total_demorados) + parseInt(this.Areas_Array[j].total_resueltos))) * 100;
          }
        }

        for (let n = 0; n < this.Areas_Array.length; n++) {
          if (this.Areas_Array[n].total_pendientes == 0 && this.Areas_Array[n].total_iniciados == 0 && this.Areas_Array[n].total_demorados == 0 && this.Areas_Array[n].total_resueltos == 0) {
            this.Areas_Array[n].promedio_p = '--';
            this.Areas_Array[n].promedio = '--';
            this.Areas_Array[n].promedio_g = '--';
          } else if (this.Areas_Array[n].total_pendientes > 0 && this.Areas_Array[n].total_iniciados == 0 && this.Areas_Array[n].total_demorados == 0 && this.Areas_Array[n].total_resueltos == 0) {
            this.Areas_Array[n].promedio = '--';
            this.Areas_Array[n].promedio_g = '--';
          }
        }
        for (let i = 0; i < this.Areas_Array.length; i++) {
          this.Contenido_PDF += this.Areas_Array[i].nombre_area + ':\n__________________________________________________________________________________________________________________\n' + '              Pendientes: ' + this.Areas_Array[i].pendientes + '              Iniciados: ' + this.Areas_Array[i].iniciados + '              Demorados: ' + this.Areas_Array[i].demorados + '              Resueltos: ' + this.Areas_Array[i].resueltos + '\n\nTiempo Promedio de Resolución: ' + this.Areas_Array[i].promedio + '\n\n\n\n';
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
    pdfMake.createPdf(documentDefinition).download('Resumen-de-Estados-MEDi-' + this.formatDate + '.pdf');
  }

  ToggleOptions(i: number): void {
    if (this.OPTIONS_ACTIVE) {
      this.OPTIONS_ACTIVE = false;
      this.CREDENCIALES_ACTIVE = false;
    } else {
      this.OPTIONS_ACTIVE = true;
      this.INDEX_AREA = i;
    }
  }

  ToggleCredenciales(): void {
    if (this.CREDENCIALES_ACTIVE) {
      this.CREDENCIALES_ACTIVE = false;
    } else {
      this.CREDENCIALES_ACTIVE = true;
    }
  }

  ToggleINFO(i: number): void {
    if (this.INFO_ACTIVE) {
      this.INFO_ACTIVE = false;
    } else {
      this.INDEX_AREA = i;
      this.INFO_ACTIVE = true;
    }
  }

  Entry_Area(clave: string): void {
    this.DS.Clave_Poder = clave;
    this.router.navigate(['/Admin-Home']);
  }

  Modificar_Area(clave_poder: string, responsable_name: string, operator_name: string): void {
    this.DS.RESPONSABLE_NAME = responsable_name;
    this.DS.OPERATOR_NAME = operator_name;
    this.DS.Clave_Poder_Modificacion = clave_poder;
    this.navigate.ToModifyArea();
  }

}
