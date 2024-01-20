import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  private direccion="http://localhost:5002/api"

  constructor(private http: HttpClient) { }

  analizar(usuarios:any):Observable  <any>{

    return this.http.post<any>(this.direccion,usuarios);

  }

}
