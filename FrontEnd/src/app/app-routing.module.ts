import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componenetes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componenetes/calendario/calendario.component';
import { HomeComponent } from './componenetes/home/home.component';
import { RegistroUsuarioComponent } from './componenetes/registro-usuario/registro-usuario.component';
import { ConsultasComponent } from './componenetes/consultas/consultas.component';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"inicio-sesion"},
  {path:"home",component:HomeComponent},
  {path:"registro-usuario", component:RegistroUsuarioComponent},
  {path:"inicio-sesion",component:InicioSesionComponent},
  {path:"calendario",component:CalendarioComponent},
  {path:"consultas",component:ConsultasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
