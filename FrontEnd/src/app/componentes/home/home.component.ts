import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario_service/usuario.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(public usuarioService:UsuarioService) { }
  
  
  cerrarSesion(){
    this.usuarioService.cerrarSesion();
  }
  esAdmin(){
    return this.usuarioService.HaveAccess();
  }
}
