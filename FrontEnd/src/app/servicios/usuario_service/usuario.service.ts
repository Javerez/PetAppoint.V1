import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


const URL = 'http://localhost:5000';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient,private router:Router) { }

  registroUsuario(formvalue:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(formvalue);
    console.log(body)
    return this.http.post(URL + '/registro', body,{'headers':headers});
  }

  inicioSesionUsuario(formvalue:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(formvalue);
    return this.http.post(URL + '/iniciosesion', body,{'headers':headers});
  }
  
  estaLogeado(){
    return !!localStorage.getItem('token');
  }
  
  cerrarSesion(){
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this.router.navigate(['inicio-sesion']);
  }

  obtenerRol(){
    let data = '[' +localStorage.getItem('userData')+']';
    var json = JSON.parse(data)
    return(json[0].idTipo);
  }

  obtenerUsuario():Observable<any>{
    return this.http.get(URL + '/obtenerUsuario');
  }

  eliminarUsuario(data:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        email: data
      },
    };
    return this.http.delete(URL + '/eliminarusuario',options);
  }
}
