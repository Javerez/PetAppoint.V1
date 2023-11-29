import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { UsuarioService } from '../usuario_service/usuario.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{
  
  constructor(private usuarioService:UsuarioService){ }

  intercept(req:HttpRequest<any>,next:HttpHandler): Observable<HttpEvent<any>>{
    const jwtTokenized = req.clone({
      setHeaders:{
        Authorization: `Bearer ${this.usuarioService.token()}`
      }
    })
    return next.handle(jwtTokenized);
  }


}
