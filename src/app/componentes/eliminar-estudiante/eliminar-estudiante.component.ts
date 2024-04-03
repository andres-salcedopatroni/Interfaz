import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.component.html',
  styleUrls: ['./eliminar-estudiante.component.css']
})
export class EliminarEstudianteComponent implements OnInit {

  usuario:any;
  mostrar:boolean = false;
  estudiante:any;
  mensajeErrorVisible:boolean = false;
  mensajeError:any;
  
  constructor(private servicioUsuario: UsersService, private route: ActivatedRoute, private router:Router) { 
    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerEstudiante(this.usuario).subscribe(
      (data)=>{
        this.mostrar = true;
        this.estudiante=data.estudiante;
      },(err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    )
  }

  ngOnInit(): void {
  }

  eliminarEstudiante(): void{
    this.servicioUsuario.eliminarEstudiante(this.estudiante).subscribe(
      (data)=> {
        console.log(data.mensaje);
        this.router.navigate(['']);
      },(err)=> {
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }   
    );
  }

  cancelar():void {
    this.router.navigate(['estudiante/'+this.usuario]);
  }
}
