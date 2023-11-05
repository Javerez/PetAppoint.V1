import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { HomeComponent } from './componentes/home/home.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { ConsultasComponent } from './componentes/consultas/consultas.component';

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
  exports: [RouterModule],
})
export class AppRoutingModule { }
