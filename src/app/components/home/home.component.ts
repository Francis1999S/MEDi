import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import * as L from 'leaflet';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { CustomService } from '../../custom.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  //////////////////
  Coordenadas_ubicacion: string = '';
  ///////////////////////
Archivo_Valido: boolean = false;

  /////////////////MESSAGES_ERROR////////////////
  Form_Valid_Error_1: string = 'Este campo es obligatorio';
  Form_Valid_Error_2: string = 'Este campo es obligatorio';
  Form_Valid_Error_3: string = 'Este campo es obligatorio';
  Form_Valid_Error_4: string = '';
  Form_Valid_Error_5: string = 'Este campo es obligatorio';
  Form_Valid_Error_6: string = 'Este campo es obligatorio';
  Form_Valid_Error_7: string = 'Este campo es obligatorio';
  Form_Valid_Error_8: string = 'Este campo es obligatorio';
  Form_Valid_Error_9: string = 'Este campo es obligatorio';

  Numero_Identificador: number = 0;
  Comunicacion_Anonima:string ='';
/////Sistema de Suba de Archivos/////////
  selectedFile1: File | undefined;
  file_url: string = '';
  Archivo_Adjuntado: boolean = false;
  ///////////////////Manejo de Errores por Invalidez de Formulario////////////////////
  Error_File: boolean = false;
  //////////////END////////////////////

////CodigoVar////
CODIGO_FILES: string = '';

  coordenadas_mapa: string = '';
  formatDate: string = '';
  formatTime: string = '';
  Resultados_Text: string = 'Tu reclamo se ha enviado con éxito';
  Resultados_Text2: string = 'Pronto recibirás información sobre tu reclamo';
  Resultados_Text3: string = '';
  Index_info: number = 0;
  MasInfo_Inputs_Form: any[] = [
    {titulo: 'Carácter del Comunicado', info: 'Define cuál será el carácter de tu comunicado, elige la opción más óptima dependiento del tema o problemática que atraviesa, por ejemplo: Sugerencia, Denuncia, Consulta, Solicitud o Reclamo.'},
    {titulo: 'Asunto', info: 'Define un asunto apropiado para tu comunicación en función del motivo o la situación que atraviesa, servirá para que podamos entender de qué trata rápidamente.'},
    {titulo: 'Descripción', info: 'Realiza una correcta descripción del motivo de tu comunicación, debe ser detallada, clara y concisa para que podamos entender de qué se trata y accionar en consecuencia.'},
    {titulo: 'Ubicación', info: 'Especifica la ubicación del problema o situación que quieres comunicarnos, utiliza referencias o el mapa a continuación para generar una ubicación exacta.'},
    {titulo: 'Mapa', info: 'Este mapa servirá para que puedas marcar una ubicación exacta de la situación o problema que nos estás comunicando, revisa que sea correcta para que podamos ocuparnos rápidamente de la situación. Luego de que hayas marcado el mapa, no olvides "Guardar la Ubicación" para ser enviada.'},
    {titulo: 'Destino', info: 'Es muy importante que asignes correctamente el área de destino de tu comunicación para que se ocupe o reciba la sugerencia, solicitud, consulta, denuncia, o reclamo. Esto hará que, en caso de que lo amerite, el proceso de resolución sea más ágil y rápido.'},
    {titulo: 'Acción Inválida', info: 'Debes completar todos los campos marcados como obligatorios (*) antes de enviar.'},
    {titulo: 'Acción Inválida', info: 'Primero debes marcar una ubicación en el mapa haciendo click o tocando sobre él.'},
    {titulo: 'Subir Archivo', info: 'Puedes subir alguna fotografía/Imagen o documento PDF que necesites adjuntar a tu comunicación.'},
  ];
  Areas_row: any;
  number_datos_module: string = '1';
  flag_info: boolean = false;
  Reclamo: any;
  Clave_Poder: any;
  Seguimiento: any;
  constructor(private http: HttpClient, private dataService: DataService, public fb: FormBuilder, private router: Router, public custom: CustomService) {
  this.Clave_Poder = this.fb.group({
    clave_poder: ['']
  });
  this.Seguimiento = this.fb.group({
    cod_conf: [''],
    seguimiento: ['']
  });
  this.Reclamo = this.fb.group({
    caracter: [''],
    titulo: [''],
    descripcion: [''],
    ubicacion_1: [''],
    ubicacion_2: [''],
    destinacion: [''],
    //////Personal Data/////
    nombre: [''],
    telefono: [''],
    email: [''],
    email_d: [''],
    domicilio: [''],
    ////Form data/////
    fecha: [''],
    hora: [''],
    estado: ['Pendiente'],
    plazo_resolucion: ['7'],
    vencimientos: ['0'],
    anonimo: ['1'],
    fecha_v: [''],

    /////Files/////
    file_1: [''],

    ///Codigo Unico///
    cod_conf: [''],
    seguimiento: ['']
  });
}
  ngOnInit(): void {
    this.custom.NAV_MENU_CELLPHONE = true;
    this.dataService.GetAllAreas().subscribe(Response => {
      this.Areas_row = Response;
    })
    this.Map_Inject_1();
  }

  ScrollDown(): void {
    var element_01 = document.getElementById('Form_Section_Scroll_Ref');
    if (element_01) {
      element_01.scrollIntoView({ behavior: 'smooth' });
    }
  }

  AsignarCoordenadas(): void {
    if (this.dataService.coordenadas_map === undefined) {
      this.openInfo(7);
    } else {
      this.Reclamo.patchValue({ ubicacion_2: this.dataService.coordenadas_map });
      this.coordenadas_mapa = this.dataService.coordenadas_map;
      var success_msg = document.getElementById('Success_msg_ubicacion');
      if (success_msg) {
        success_msg.style.display = 'flex';
      }
    }
  }
  onFileSelected1(event: any) {
    this.selectedFile1 = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      this.file_url = event.target.files[0].name;
    }
  }

FormInteraction(): void {
var form = document.getElementById('Box_Datos_Personales');
    if (this.Reclamo.get('caracter').value === 'Sugerencia' || this.Reclamo.get('caracter').value === 'Consulta' || this.Reclamo.get('caracter').value === 'Solicitud') {
      if (form) {
        form.style.display = 'flex';
      }
      this.number_datos_module = '2';
      this.Reclamo.patchValue({ anonimo: '0' });
    } else {
      if (form) {
        form.style.display = 'none';
      }
      this.number_datos_module = '1';
      this.Reclamo.patchValue({ anonimo: '1' });
    }
}
openInfo(info: number): void {
  this.Index_info = info;
  var Info_Box = document.getElementById('Ventana_Ventana_Información');
  if (Info_Box) {
    if (this.flag_info) {
      Info_Box.style.display = 'none';
      this.flag_info = false;
    } else {
      Info_Box.style.display = 'flex';
      this.flag_info = true;
    }
  }
}

generarCodigoAleatorio(): void {
  // Generar un array de 8 números aleatorios entre 0 y 9
  const numerosAleatorios: number[] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));

  // Convertir el array a una cadena
  const codigoAleatorio: string = numerosAleatorios.join('');

  this.CODIGO_FILES = codigoAleatorio;

  // Generar un array de 8 números aleatorios entre 0 y 9
  const numer: number[] = Array.from({ length: 10 }, () => Math.floor(Math.random() * 10));

  // Convertir el array a una cadena
  const cod: string = numer.join('');

  this.CODIGO_FILES = cod;
}

ValidarReclamo(): void {
  if (this.file_url === '') {
    this.Archivo_Adjuntado = false;
  } else {
    this.Archivo_Adjuntado = true;
  }
  this.Error_File = false;
  this.generarCodigoAleatorio();
  if (this.Reclamo.get('anonimo').value === '1') {
    if (this.Reclamo.get('caracter').value === '' ||
      this.Reclamo.get('titulo').value === '' ||
    this.Reclamo.get('descripcion').value === '' ||
    this.Reclamo.get('destinacion').value === '' ||

    ((!(this.file_url.toLowerCase().endsWith('.jpg')) && !(this.file_url.toLowerCase().endsWith('.pdf')) && !(this.file_url.toLowerCase().endsWith('.png')) && !(this.file_url.toLowerCase().endsWith('.jpeg'))) && this.Archivo_Adjuntado)) {
      if (!(this.file_url.toLowerCase().endsWith('.jpg')) &&
      !(this.file_url.toLowerCase().endsWith('.pdf')) &&
      !(this.file_url.toLowerCase().endsWith('.png')) &&
      !(this.file_url.toLowerCase().endsWith('.jpeg'))) {
        this.Error_File = true; }
      this.openInfo(6);
    } else {
this.EnviarReclamo();
    }
  } else {
    if (this.Reclamo.get('caracter').value === '' ||
    this.Reclamo.get('titulo').value === '' ||
    this.Reclamo.get('descripcion').value.length < 6 ||
    this.Reclamo.get('destinacion').value === '' ||
    this.Reclamo.get('nombre').value === '' ||
    this.Reclamo.get('telefono').value.length < 6 ||
    !(this.Reclamo.get('email').value.includes('@')) ||
    this.Reclamo.get('domicilio').value.length < 6 ||
    ((!(this.file_url.toLowerCase().endsWith('.jpg')) &&
    !(this.file_url.toLowerCase().endsWith('.pdf')) &&
    !(this.file_url.toLowerCase().endsWith('.png')) &&
    !(this.file_url.toLowerCase().endsWith('.jpeg'))) &&
  this.Archivo_Adjuntado)) {
      if (!(this.file_url.toLowerCase().endsWith('.jpg')) &&
      !(this.file_url.toLowerCase().endsWith('.pdf')) &&
      !(this.file_url.toLowerCase().endsWith('.png')) &&
      !(this.file_url.toLowerCase().endsWith('.jpeg'))) {
        this.Error_File = true;
      }
      this.openInfo(6);
    } else {
      this.EnviarReclamo();
    }
  }  
}
Aceptar_Reload_Function(): void {
  location.reload();
}
generateRandomCode(length: number): string {
  const digits = '0123456789';
  let code = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      code += digits[randomIndex];
  }
  return code;
}
EnviarReclamo():void {
  if (this.Reclamo.get('ubicacion_2').value === '') {
    this.Coordenadas_ubicacion = '*NINGUNA UBICACIÓN MARCADA*';
  } else {
    this.Coordenadas_ubicacion = this.Reclamo.get('ubicacion_2').value;
  }
  const New_Code: string = this.generarCodigo(18);

  var Boton_1 = document.getElementById('Boton_Send_Reclam_1');
  var Boton_2 = document.getElementById('Boton_Send_Reclam_2');
 
  if (Boton_1 && Boton_2) {
    Boton_1.style.display = 'none';
    Boton_2.style.display = 'flex';
  }
  const now = new Date();
  this.formatDate = this.formatDate_1(now);
  this.formatTime = this.formatTime_2(now);

  this.Reclamo.patchValue({ cod_conf: New_Code});
  this.Reclamo.patchValue({ fecha: this.formatDate });
this.Reclamo.patchValue({ hora: this.formatTime });
this.Reclamo.patchValue({ fecha_v: this.formatDate });
  var Bar_Loading = document.getElementById('Loader_Bar_Btn');
  if (Bar_Loading) {
    Bar_Loading.style.width = '100%';
  }

  const formData = new FormData();

  if (this.Archivo_Adjuntado) {
    if (this.selectedFile1) {
      formData.append('file1', this.selectedFile1, this.CODIGO_FILES + '-' + this.file_url);
    }
    //Sistema de Carga de Archivos--
    this.http.post<any>('https://tinogasta.gob.ar/MEDi/upload.php', formData)
      .subscribe(
        (response) => {
          //   console.log('Archivo1 subido correctamente:', response.url1);
          //   console.log('Archivo2 subido correctamente:', response.url2);
  
          // Aquí puedes guardar la URL en la base de datos si lo deseas
          this.Reclamo.patchValue({ file_1: response.url1 });
          const reclamo = this.Reclamo.value;
          this.Clave_Poder.patchValue({ clave_poder: reclamo.destinacion });
          this.dataService.InsertNewReclam(reclamo).subscribe(data => {
            var Prefijo: string;
            switch (this.Reclamo.get('caracter').value) {
                case 'Reclamo':
                Prefijo = 'REC';
                break;
                case 'Solicitud':
                  Prefijo = 'SOL';
                break;
                case 'Sugerencia':
                  Prefijo = 'SUG';
                break;
                case 'Denuncia':
                  Prefijo = 'DEN';
                break;
                case 'Consulta':
                  Prefijo = 'CON';
                break;
              default:
                break;
            }
            const RandomCode = this.generateRandomCode(6);
            this.Numero_Identificador = data.id;
            if (this.Reclamo.get('anonimo').value === '0') {
              this.Comunicacion_Anonima = 'No';
            } else {
              this.Comunicacion_Anonima = 'Sí';
            }
            this.Seguimiento.patchValue({ seguimiento: data.id + '-' + Prefijo + '-' + RandomCode});
            this.Seguimiento.patchValue({ cod_conf: this.Reclamo.get('cod_conf').value});
            this.dataService.Insertar_Cod_Seguimiento(this.Seguimiento.value).subscribe(data=>{
              this.dataService.AddStatistics(reclamo).subscribe(data2 => {
                this.dataService.GetAllAreasSelect(this.Clave_Poder.value).subscribe(data3 => {
                  const email_d = data3[0].email;
                  this.Reclamo.patchValue({ email_d: email_d });
                  this.Reclamo.patchValue({fecha_v: 'Aún no definido'});
                  const reclamo_2 = this.Reclamo.value;
                  this.dataService.Send_Mail(reclamo_2).subscribe(data4 => {
                  })
                  if (Boton_1 && Boton_2) {
                    Boton_1.style.display = 'none';
                    Boton_2.style.display = 'flex';
                  }
                  this.Resultados_Text = 'Tu ' + this.Reclamo.get('caracter').value + ' se ha enviado con éxito.';
                  this.Resultados_Text2 = 'Haz el seguimiento de tu ' + this.Reclamo.get('caracter').value + ' en la sección "Seguimientos" con el siguiente código:';
                  this.Resultados_Text3 = this.Seguimiento.get('seguimiento').value;
                  setTimeout(function() {
                    var Ventana_Results = document.getElementById('Ventana_Resultado');
                    if (Ventana_Results) {
                      Ventana_Results.style.display = 'flex';
                    }
                  }, 5000);
                })
              });
            });
   
        
          })
        },
        (error) => {
          console.error('Error al subir el archivo:', error);
       
        }
      );
  } else {
          this.Reclamo.patchValue({ file_1: '*NINGUNO*' });
          const reclamo = this.Reclamo.value;
          this.Clave_Poder.patchValue({ clave_poder: reclamo.destinacion });
          this.dataService.InsertNewReclam(reclamo).subscribe(data => {
            var Prefijo: string;
            switch (this.Reclamo.get('caracter').value) {
                case 'Reclamo':
                Prefijo = 'REC';
                break;
                case 'Solicitud':
                  Prefijo = 'SOL';
                break;
                case 'Sugerencia':
                  Prefijo = 'SUG';
                break;
                case 'Denuncia':
                  Prefijo = 'DEN';
                break;
                case 'Consulta':
                  Prefijo = 'CON';
                break;
              default:
                break;
            }
            const RandomCode = this.generateRandomCode(6);
            this.Numero_Identificador = data.id;
            if (this.Reclamo.get('anonimo').value === '0') {

            } else {

            }
            this.Seguimiento.patchValue({ seguimiento: data.id + '-' + Prefijo + '-' + RandomCode});
            this.Seguimiento.patchValue({ cod_conf: this.Reclamo.get('cod_conf').value});
            this.dataService.Insertar_Cod_Seguimiento(this.Seguimiento.value).subscribe(data=>{
              this.dataService.AddStatistics(reclamo).subscribe(data2 => {
                this.dataService.GetAllAreasSelect(this.Clave_Poder.value).subscribe(data3 => {
                  const email_d = data3[0].email;
                  this.Reclamo.patchValue({ email_d: email_d });
                  this.Reclamo.patchValue({fecha_v: 'Aún no definido'});
                  const reclamo_2 = this.Reclamo.value;
                  this.dataService.Send_Mail(reclamo_2).subscribe(data4 => {
                  })
                  if (Boton_1 && Boton_2) {
                    Boton_1.style.display = 'none';
                    Boton_2.style.display = 'flex';
                  }
                  this.Resultados_Text = 'Tu ' + this.Reclamo.get('caracter').value + ' se ha enviado con éxito.';
                  this.Resultados_Text2 = 'Haz el seguimiento de tu ' + this.Reclamo.get('caracter').value + ' en la sección "Seguimientos" con el siguiente código:';
                  this.Resultados_Text3 = this.Seguimiento.get('seguimiento').value;
                  setTimeout(function() {
                    var Ventana_Results = document.getElementById('Ventana_Resultado');
                    if (Ventana_Results) {
                      Ventana_Results.style.display = 'flex';
                    }
                  }, 5000);
                })
              });
            });
   
        
          })

  }

}
CopyToClipboard(): void {
  var Message = document.getElementById('Ventana_Codigo_Copiado_Exitoso');

  navigator.clipboard.writeText(this.Seguimiento.get('seguimiento').value).then(() => {
if (Message) {
  Message.style.display = 'flex';
}
setTimeout(() => {
  Message.style.opacity = '0';
  setTimeout(() => {
    if (Message) {
      Message.style.display = 'none';
    }
  }, 1000);

}, 3000);
}).catch(err => {

});
}
formatDate_1(date: Date): string {
  // Formato YYYY-MM-DD
  return date.toISOString().split('T')[0];
}

formatTime_2(date: Date): string {
  // Formato HH:mm:ss
  return date.toTimeString().split(' ')[0];
}

Map_Inject_1(): void {
  var Container_Map = document.getElementById('Mapa_Ubicacion');
  var Map_2 = document.getElementById('map2');
  var Map = document.getElementById('map');
  if (Map && Map_2){
    Map.style.display = 'flex';
    Map_2.style.display = 'none';
    Container_Map.style.opacity = '1';
  }
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

Map_Inject_2(): void {
  var Container_Map = document.getElementById('Mapa_Ubicacion');
  var Map_2 = document.getElementById('map2');
  var Map = document.getElementById('map');
  if (Map && Map_2 && Container_Map){
    Map.style.display = 'none';
    Map_2.style.display = 'flex';
    Container_Map.style.opacity = '1';
  }
  const map2 = L.map('map2').setView([-28.065437, -67.56433], 14);
  L.tileLayer('https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
}).addTo(map2);

var popup = L.popup();
const onMapClick = (e: any) => {
  this.dataService.coordenadas_map = e.latlng.toString();
    popup
        .setLatLng(e.latlng)
        .setContent("Ubicación")
        .openOn(map2);
}
map2.on('click', onMapClick.bind(this));
var marker = L.marker([this.dataService.Latitud, this.dataService.Longitud]).addTo(map2);
}
navigateToEmpezar() {
  this.router.navigate(['/Como-Empezar']);
}
generarCodigo(longitud: number): string {
  const caracteres: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let codigo: string = '';
  // Obtener la longitud total de la cadena de caracteres
  const caracteresLongitud: number = caracteres.length;
  // Generar el código alfanumérico
  for (let i = 0; i < longitud; i++) {
      // Obtener un carácter aleatorio de la cadena de caracteres
      codigo += caracteres.charAt(Math.floor(Math.random() * caracteresLongitud));
  }
  return codigo;
}
Delete_Files_Form(): void {
this.file_url = '';
this.Archivo_Adjuntado = false;
this.Validacion_Form(4);
}

//////////////////////PDF MAKER////////////////////////
 ////////////////////////Generador de PDFs////////////////////////////
 generarPDF() {
  const documentDefinition = {
    content: [
      {
        text: 'Fecha: ' + this.Reclamo.get('fecha').value + '\n',
        style: 'small4'
      },
      {
        text: 'Hora: ' + this.Reclamo.get('hora').value + '\n',
        style: 'small4'
      },
      {
        text: 'Tinogasta, Catamarca\n',
        style: 'small4',
        bold: true
      },
      {
        text: this.Reclamo.get('caracter').value + ': ' + this.Reclamo.get('titulo').value,
        style: 'header',
        alignment: 'center'
      },
      '\n\n',
      {
        text: 'Código de Seguimiento: ' + this.Resultados_Text3 + '\n',
        style: 'small3'
      },
      {
        text: 'Identificador: ' + this.Numero_Identificador + '\n',
        style: 'small3'
      },
      {
        text: 'Carácter: ' + this.Reclamo.get('caracter').value + '\n',
        style: 'small2'
      },
      {
        text: 'Asunto: ' + this.Reclamo.get('titulo').value + '\n',
        style: 'small2'
      },
      {
        text: 'Plazo de Resolución Actual: ' + this.Reclamo.get('plazo_resolucion').value + ' días' + '\n',
        style: 'small2'
      },
      {
        text: 'Próximo Vencimiento: Sin definir' + '\n',
        style: 'small2'
      },
      {
        text: 'Veces Demorado/Vencido: Ninguna\n\n',
        style: 'small2'
      },
      {
        text: 'El Remitente es Anónimo: ' + this.Comunicacion_Anonima + '\n',
        style: 'small2'
      },
      {
        text: 'Nombre: ' + this.Reclamo.get('nombre').value + '\n',
        style: 'small2'
      },
      {
        text: 'Teléfono: ' + this.Reclamo.get('telefono').value + '\n',
        style: 'small2'
      },
      {
        text: 'E-mail: ' + this.Reclamo.get('email').value + '\n',
        style: 'small2'
      },
      {
        text: 'Domicilio: ' + this.Reclamo.get('domicilio').value + '\n\n\n',
        style: 'small2'
      },
      {
        text: 'Descripción:',
        style: 'subheader',
        alignment: 'center'
      },
      this.Reclamo.get('descripcion').value + '\n\n\n',
      {
        text: 'Ubicación:',
        style: 'subheader',
        alignment: 'center'
      },
      this.Reclamo.get('ubicacion_1').value + '\n',
      'Coordenadas: ' + this.Coordenadas_ubicacion + '\n\n\n',
      {
        text: 'Adjuntos:',
        style: 'subheader',
        alignment: 'center'
      },
      {
        text: this.Reclamo.get('file_1').value + '\n\n\n\n\n',
        style: 'small2', color: 'blue'
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
  pdfMake.createPdf(documentDefinition).download(this.Reclamo.get('caracter').value + '-Nro-'+this.Numero_Identificador+'.pdf');
}
Validacion_Form(key: number): void {
var Error_1 = document.getElementById('Valid_Error_Display_1');

switch (key) {
  case 1:
    if (this.Reclamo.get('caracter').value === '') {
      this.Form_Valid_Error_1 = 'Este campo es obligatorio';
      Error_1.style.display = 'flex';
    } else {
      Error_1.style.display = 'none';
    }
    break;
    case 2:
      if (this.Reclamo.get('titulo').value === '') {
        this.Form_Valid_Error_2 = 'Este campo es obligatorio';
      }
      if (this.Reclamo.get('titulo').value.length < 6) {
        this.Form_Valid_Error_2 = 'Longitud Inválida';
      }
    break;
    case 3:
      if (this.Reclamo.get('descripcion').value === '') {
        this.Form_Valid_Error_3 = 'Este campo es obligatorio. Aceptado 50 carácteres como mínimo';
      }
      if (this.Reclamo.get('descripcion').value.length < 50) {
        this.Form_Valid_Error_3 = 'Longitud Inválida. Aceptado 50 carácteres como mínimo';
      }
    break;
    case 4:
      setTimeout(() => {
        if (!(this.file_url.toLowerCase().endsWith('.jpg')) && !(this.file_url.toLowerCase().endsWith('.pdf')) && !(this.file_url.toLowerCase().endsWith('.png')) && !(this.file_url.toLowerCase().endsWith('.jpeg'))) {
          this.Form_Valid_Error_4 = 'Formato de Archivo Inválido: Utiliza png, jpg o pdf';
          this.Archivo_Valido = false;
        } else {
          this.Archivo_Valido = true;
        }
        if (this.file_url === '') {
          this.Archivo_Valido = true;
        }
      }, 500);
     
    break;
    case 6:
      if (this.Reclamo.get('nombre').value === '') {
        this.Form_Valid_Error_6 = 'Este campo es obligatorio';
      }
      if (this.Reclamo.get('nombre').value.length < 6) {
        this.Form_Valid_Error_6 = 'Longitud Inválida';
      }
    break;
    case 7:
      if (this.Reclamo.get('telefono').value === '') {
        this.Form_Valid_Error_7 = 'Este campo es obligatorio';
      }
          if (this.Reclamo.get('telefono').value.length < 6) {
        this.Form_Valid_Error_7 = 'Longitud Inválida';
      }
    break;
    case 8:
          if (this.Reclamo.get('email').value === '') {
        this.Form_Valid_Error_8 = 'Este campo es obligatorio';
      }
      if (!(this.Reclamo.get('email').value.includes('@')) || this.Reclamo.get('email').value.length < 6) {
        this.Form_Valid_Error_8 = 'Correo Electrónico Inválido';
      }
    break;
    case 9:
          if (this.Reclamo.get('domicilio').value === '') {
        this.Form_Valid_Error_9 = 'Este campo es obligatorio';
      }
      if (this.Reclamo.get('domicilio').value.length < 6) {
        this.Form_Valid_Error_9 = 'Longitud Inválida';
      }
    break;
  default:
    break;
}




}
}
