import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario_service/usuario.service';
import { inject } from '@angular/core';

export const roleGuard: CanActivateFn = (route, state) => {
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);
  const rolPermitido = route.data['role'];

  const rol = usuarioService.obtenerRol();
  if ( rolPermitido == rol){
    return true;
  }
  else{
    router.navigate(['home']);
    return false;
  }
};

