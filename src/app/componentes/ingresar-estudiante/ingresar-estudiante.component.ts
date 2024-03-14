import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnalisisService } from 'src/app/services/analisis.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ingresar-estudiante',
  templateUrl: './ingresar-estudiante.component.html',
  styleUrls: ['./ingresar-estudiante.component.css']
})
export class IngresarEstudianteComponent implements OnInit {

  nombre:any;
  usuario:any;
  codigo:any;
  correo:any;
  celular:any;
  escuela:string='Ingeniería de Sistemas';
  escuelas:Array<string>=['Ingeniería de Sistemas','Ingeniería de Software']
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  
  constructor(private servicioUsuario: UsersService, private router:Router, private servicioAnalisis: AnalisisService) { }

  ngOnInit(): void {
  }

  ingresar(): void {

    this.servicioUsuario.ingresarUsuarios(
      {
        "nombre":this.nombre,
        "usuario":this.usuario,
        "codigo":this.codigo,
        "correo":this.correo,
        "celular":this.celular,
        "escuela":this.escuela
      }).subscribe(
      (data)=> {
        this.mensajeErrorVisible=false;
        this.router.navigate(['**']);
      },(err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    )

  }

}
