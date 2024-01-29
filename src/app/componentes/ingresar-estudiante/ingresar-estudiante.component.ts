import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  
  constructor(private servicioUsuario: UsersService, private router:Router) { }

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
        console.log(error)
      }   
    )

  }

}
