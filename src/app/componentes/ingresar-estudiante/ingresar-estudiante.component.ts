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
        "celular":this.celular}).subscribe(
      (data)=> {
        this.router.navigate(['**']);
      },(error)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=error;
      }   
    )

  }

}
