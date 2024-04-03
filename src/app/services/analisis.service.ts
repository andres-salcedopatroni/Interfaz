import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  //private direccion="http://localhost:5002/api"
  private direccion="https://andressalcedo2023.pythonanywhere.com"

  constructor(private http: HttpClient) { }

  analizar(usuarios:any):Observable  <any>{

    return this.http.post<any>(this.direccion,usuarios);

  }

  obtenerTweets(usuario:any):Observable  <any>{

    return this.http.post<any>(this.direccion+"/tweets",usuario);

  }

}
