import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioSesionComponent } from './componenetes/inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {path:"",pathMatch:"full",redirectTo:"inicio-sesion"},
  {path:"inicio-sesion",component:InicioSesionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
