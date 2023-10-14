import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componenetes/inicio-sesion/inicio-sesion.component';
import { HomeComponent } from './componenetes/home/home.component';
import { RegistroUsuarioComponent } from './componenetes/registro-usuario/registro-usuario.component';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"home"},
  {path:"home",component:HomeComponent},
  {path:"registro-usuario", component:RegistroUsuarioComponent},
  {path:"inicio-sesion",component:InicioSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
