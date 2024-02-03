import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.component.html',
  styleUrls: ['./eliminar-estudiante.component.css']
})
export class EliminarEstudianteComponent implements OnInit {

  usuarios:any;
  resultados:any;
  lista_id:any=[];
  aceptacion:any=[];
  estudiantes:any=[];
  
  constructor(private servicioUsuario: UsersService) { 

    this.servicioUsuario.obtenerUsuarios().subscribe(
      (data)=> {
        this.usuarios=data
      },(error)=> {
        console.log(error)
      }   
    )

  }

  ngOnInit(): void {
  }

  eliminarEstudiantes(): void{
    
    this.servicioUsuario.eliminarUsuarios({"eliminar":this.estudiantes}).subscribe(
      (data)=> {
        this.servicioUsuario.obtenerUsuarios().subscribe(
          (data)=> {
            this.usuarios=data
          },(error)=> {
            console.log(error)
          }   
        )
      },(error)=> {
        console.log(error)
      }   
    )

   
  }

  onChange(usuario:any, index: any):void {
    if(this.aceptacion[index]) {
      this.estudiantes.push(usuario);
    } else {
      let index = this.estudiantes.indexOf(usuario);
      this.estudiantes.splice(index,1);
    }
}
}
