import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioSesionComponent } from './componenetes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componenetes/calendario/calendario.component';
import { ConsultasComponent } from './componenetes/consultas/consultas.component';
import { RegistroUsuarioComponent } from './componenetes/registro-usuario/registro-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CalendarioComponent,
    ConsultasComponent,
    RegistroUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
