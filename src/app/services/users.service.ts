import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private direccion="https://distinct-tunic-calf.cyclic.app/estudiantes"

  constructor(private http: HttpClient) { }

  obtenerUsuarios():Observable<any>{

    return this.http.get<any>(this.direccion+"/mostrar");

  }

  ingresarUsuarios(estudiantes:any):Observable<any>{

    return this.http.post<any>(this.direccion+"/agregar",estudiantes);

  }

  eliminarUsuarios(estudiantes:any):Observable<any>{

    return this.http.delete<any>(this.direccion+"/eliminar", {body:estudiantes});

  }

}
