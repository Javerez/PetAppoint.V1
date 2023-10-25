import { Component } from '@angular/core';
import { UsuarioService } from 'src/app/servicios/usuario_service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(public usuarioService:UsuarioService) { }
  user: any;
  ngOnInit(): void {
    const data = localStorage.getItem("userData");
    if (data!=null){
      this.user=JSON.parse(data);
    }
  }
  
  cerrarSesion(){
    this.usuarioService.cerrarSesion();
  }
  esAdmin(){
    if(this.user.admin==1){
      
      return true;
    }
    else return false;
  }
}
