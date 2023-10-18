import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario_service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private usuarioService:UsuarioService) { }

  ngOnInit() {
  }
  
  cerrarSesion(){
    this.usuarioService.cerrarSesion();
  }
}
