import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { BandejaEntradaComponent } from './components/bandeja-entrada/bandeja-entrada.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { loginGuard } from './guards/login.guard';
import { loginGuard_2 } from './guards/login_2.guard';
import { loginGuard_3 } from './guards/login_3.guard';
import { AyudaComponent } from './components/ayuda/ayuda.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { EstadisticaComponent } from './components/estadistica/estadistica.component';
import { SuperAdminComponent } from './components/super-admin/super-admin.component';
import { CrearDestinacionComponent } from './components/crear-destinacion/crear-destinacion.component';
import { Login2Component } from './components/login2/login2.component';
import { EmpezarComponent } from './components/empezar/empezar.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { SeguimientoComponent } from './components/seguimiento/seguimiento.component';
import { ModificarComponent } from './components/modificar/modificar.component';
import { VersionComponent } from './components/version/version.component';

const routes: Routes = [
  {path: 'Como-Empezar', component: EmpezarComponent},
  { path: 'Confirmar-Comunicacion/:codigo', component: ConfirmarComponent},
    { path: 'Home', component: HomeComponent },
    {path: 'Version', component: VersionComponent},
    { path: 'Ayuda', component: AyudaComponent},
    { path: 'Contacto', component: ContactoComponent},
    { path: 'LogIn', component: LoginComponent},
    { path: 'LogIn-Pass', component: Login2Component, canActivate: [loginGuard]},
    { path: 'Estadisticas', component: EstadisticaComponent},
    { path: 'Bandeja-Entrada', component: BandejaEntradaComponent, canActivate: [loginGuard_2]},
    { path: 'Admin-Home', component: AdminHomeComponent, canActivate: [loginGuard_2]},
    { path: 'Super-Admin', component: SuperAdminComponent, canActivate: [loginGuard_3],
      children: [
        { path: 'Crear-Destinacion', component: CrearDestinacionComponent, canActivate: [loginGuard_3]},
      ],
    },
    { path: 'Crear-Destinacion', component: CrearDestinacionComponent, canActivate: [loginGuard_3]},
    { path: 'Modificar-Destinacion', component: ModificarComponent, canActivate: [loginGuard_3]},
    { path: 'Seguimiento', component: SeguimientoComponent},
    { path: '', redirectTo: '/Home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
