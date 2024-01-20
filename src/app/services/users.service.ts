import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  private direccion="http://localhost:5002/usuarios"

  constructor(private http: HttpClient) { }

  obtenerUsuarios():Observable<any>{

    return this.http.get<any>(this.direccion);

  }

}
