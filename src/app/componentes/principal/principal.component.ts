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
    if(this.tipoUsuario=='Todos')
      this.estudiantes=this.todos_estudiantes;
    else{
      this.estudiantes=[];
      for(let e of this.todos_estudiantes){
        if(e.estado==this.tipoUsuario)
          this.estudiantes.push(e)
      }
    }
  }
  
  verEstudiante(usuario:any): void {
    this.router.navigate(['estudiante/'+usuario]);
  }

  resgistrarEstudiante(): void{
    this.router.navigate(['ingresar-estudiantes']);
  }
}
