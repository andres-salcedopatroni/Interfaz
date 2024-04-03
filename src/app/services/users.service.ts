import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private direccion="https://zany-pink-nightingale-tie.cyclic.app/estudiantes"
  //private direccion="http://localhost:3000/estudiantes"

  constructor(private http: HttpClient) { }

  obtenerEstudiantes():Observable<any>{

    return this.http.get<any>(this.direccion+"/mostrar");

  }

  obtenerEstudiante(estudiante:any):Observable<any>{

    return this.http.get<any>(this.direccion+"/obtener/"+estudiante);

  }

  registrarEstudiante(estudiantes:any):Observable<any>{

    return this.http.post<any>(this.direccion+"/agregar",estudiantes);

  }

  actualizarEstudiante(estudiante:any):Observable<any>{
    return this.http.put<any>(this.direccion+"/actualizar", estudiante);
  }
  
  eliminarEstudiante(estudiante:any):Observable<any>{
    return this.http.delete<any>(this.direccion+"/eliminar", {body:estudiante});
  }

}
