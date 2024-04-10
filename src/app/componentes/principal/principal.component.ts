import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  estudiantes:any;
  nombreUsuario:any='';
  todos_estudiantes:any;
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  tipoUsuario:any='Todos'
  
  constructor(private servicioUsuario: UsersService,private router:Router) { 
    this.servicioUsuario.obtenerEstudiantes().subscribe(
      (data)=> {
        this.estudiantes=data;
        this.todos_estudiantes=data;
      },(err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    )
  }

  ngOnInit(): void {
  }
  
  filtrarUsuarios(): void {
    this.estudiantes=this.todos_estudiantes;
    var filtro_estudiantes=[];
    if(this.nombreUsuario!=''){      
      for(let e of this.estudiantes){
        if(e.nombre?.indexOf(this.nombreUsuario)>=0)
          filtro_estudiantes.push(e)
      }
      this.estudiantes=filtro_estudiantes;
    }
    filtro_estudiantes=[];
    if(this.tipoUsuario!='Todos'){
      for(let e of this.estudiantes){
        if(e.estado==this.tipoUsuario)
          filtro_estudiantes.push(e)
      }
      this.estudiantes=filtro_estudiantes;
    }
  }
  
  verEstudiante(usuario:any): void {
    this.router.navigate(['estudiante/'+usuario]);
  }

  resgistrarEstudiante(): void{
    this.router.navigate(['ingresar-estudiantes']);
  }
}
