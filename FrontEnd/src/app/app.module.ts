import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { FullCalendarModule} from '@fullcalendar/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//paginas
import { InicioSesionComponent } from './componenetes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componenetes/calendario/calendario.component';
import { ConsultasComponent } from './componenetes/consultas/consultas.component';
import { RegistroUsuarioComponent } from './componenetes/registro-usuario/registro-usuario.component';
import { HomeComponent } from './componenetes/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CalendarioComponent,
    ConsultasComponent,
    RegistroUsuarioComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    FullCalendarModule,
    NgbModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
