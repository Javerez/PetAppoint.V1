import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { ConsultasComponent } from './componentes/consultas/consultas.component';

import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"inicio-sesion"},
  {path:"home",component:HomeComponent,canActivate:[authGuard]},
  {path:"registro-usuario", component:RegistroUsuarioComponent,canActivate:[authGuard,roleGuard],
  data:{
    role:"D8a1;or4nIF@"
  }},
  {path:"inicio-sesion",component:InicioSesionComponent},
  {path:"calendario",component:CalendarioComponent,canActivate:[authGuard]},
  {path:"consultas",component:ConsultasComponent,canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
