import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { BandejaEntradaComponent } from './components/bandeja-entrada/bandeja-entrada.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { HeaderphonesComponent } from './components/headerphones/headerphones.component';
import { MapComponent } from './components/map/map.component';
import { EstadisticaAdminComponent } from './components/estadistica-admin/estadistica-admin.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { CrearDestinacionComponent } from './components/crear-destinacion/crear-destinacion.component';
import { Login2Component } from './components/login2/login2.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Map2Component } from './components/map-2/map-2.component';
import { EmpezarComponent } from './components/empezar/empezar.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { VersionComponent } from './components/version/version.component';
import { ComunicacionesAdminComponent } from './components/comunicaciones-admin/comunicaciones-admin.component';
import { ResumenAdminComponent } from './components/resumen-admin/resumen-admin.component';
import { AreasAdminComponent } from './components/areas-admin/areas-admin.component';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

registerLocaleData(localeEs);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    BandejaEntradaComponent,
    AdminHomeComponent,
    AyudaComponent,
    EstadisticaComponent,
    ContactoComponent,
    HeaderphonesComponent,
    MapComponent,
    EstadisticaAdminComponent,
    SuperAdminComponent,
    CrearDestinacionComponent,
    Login2Component,
    Map2Component,
    EmpezarComponent,
    ConfirmarComponent,
    SeguimientoComponent,
    ModificarComponent,
    VersionComponent,
    ComunicacionesAdminComponent,
    ResumenAdminComponent,
    AreasAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }, { provide: LOCALE_ID, useValue: 'es-ES' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
