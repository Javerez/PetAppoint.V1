import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const URL = 'http://localhost:5000';

@Injectable({
  providedIn: 'root'
})
export class ConsultasService {

  constructor(private http:HttpClient) {
      
  }
  public getConsultas():Observable<any>{
    return this.http.get(URL + '/api/consultas');
  }
  public consultaPorId(data : any): Observable<any> {
    const headers = { 'content-type': 'application/json'} 
    const body={
      idConsulta: data
    }
    return this.http.post(URL + '/api/consultaPorId', body,{'headers':headers});
  }
  public agregarConsulta(formvalue:any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(formvalue);
    return this.http.post(URL + '/api/agregarconsulta', body,{'headers':headers});
  }

  public actualizarConsulta(formvalue:any, data : any): Observable<any> {
    let aux:any
    if(data instanceof Object)aux=data.idConsulta
    else aux = data
    
    const headers = { 'content-type': 'application/json'} 
    const body={
      idConsulta: aux,
      data: formvalue
    }
    return this.http.put(URL + '/api/actualizarconsulta', body,{'headers':headers});
  }
  

  public eliminarConsulta(data:any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        idConsulta: data
      },
    };
    return this.http.delete(URL + '/api/eliminarconsulta',options);
  }
}