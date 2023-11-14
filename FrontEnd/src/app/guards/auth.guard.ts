import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario_service/usuario.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  if(usuarioService.estaLogeado()){
    return true;
  }
  else{
    router.navigate(['inicio-sesion']);
    return false;
  }
};
