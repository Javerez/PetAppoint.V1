
//Formularios
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
//Re-Captcha
import { NgxCaptchaModule } from 'ngx-captcha';
//Fullcalendar
import { FullCalendarModule } from '@fullcalendar/angular';
//Angular material
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule} from '@angular/material/radio'; 
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'; 


//Angular
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule ,HTTP_INTERCEPTORS} from '@angular/common/http';
//paginas
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { CalendarioComponent } from './componentes/calendario/calendario.component';
import { ConsultasComponent } from './componentes/consultas/consultas.component';
import { RegistroUsuarioComponent } from './componentes/registro-usuario/registro-usuario.component';
import { HomeComponent } from './componentes/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgregarFechaComponent } from './componentes/agregar-fecha/agregar-fecha.component';
//Fecha y hora
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { TokenInterceptorService } from './services/token_interceptor/token-interceptor.service';
import { ConfirmacionComponent } from './componentes/confirmacion/confirmacion.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioSesionComponent,
    CalendarioComponent,
    ConsultasComponent,
    RegistroUsuarioComponent,
    HomeComponent,
    AgregarFechaComponent,
    ConfirmacionComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgxCaptchaModule,
    FullCalendarModule,
    NgbModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatSlideToggleModule,
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    },
    {provide: MAT_DATE_LOCALE, useValue: 'es-CL'},

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
