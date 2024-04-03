import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ingresar-estudiante',
  templateUrl: './ingresar-estudiante.component.html',
  styleUrls: ['./ingresar-estudiante.component.css']
})

export class IngresarEstudianteComponent implements OnInit {

  nombre?:string;
  usuario?:string;
  codigo?:string;
  correo?:string;
  celular?:number;
  escuela:string='Ingeniería de Sistemas';
  escuelas:Array<string>=['Ingeniería de Sistemas','Ingeniería de Software']
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  
  constructor(private servicioUsuario: UsersService, private router:Router) { }

  ngOnInit(): void {
  }

  registrarEstudiante(): void {
    this.servicioUsuario.registrarEstudiante(
      {
        "nombre":this.nombre,
        "usuario":this.usuario,
        "codigo":this.codigo,
        "correo":this.correo,
        "celular":this.celular,
        "escuela":this.escuela
      }
    ).subscribe(
      (data)=> {
        this.mensajeErrorVisible=false;
        this.router.navigate(['']);
      },(err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    )
  }

  cancelar():void {
    this.router.navigate(['']);
  }

}
