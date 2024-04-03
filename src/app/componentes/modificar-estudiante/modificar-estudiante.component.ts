import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.css']
})
export class ModificarEstudianteComponent {
  
  usuario:any;
  mensajeErrorVisible:boolean=false;
  mensajeError:string='';
  nombre?:string;
  codigo?:string;
  correo?:string;
  celular?:number;
  escuela?:string;
  escuelas:Array<string>=['Ingeniería de Sistemas','Ingeniería de Software']

  constructor(private servicioUsuario: UsersService, private route: ActivatedRoute, private router:Router) { 
    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerEstudiante(this.usuario).subscribe(
      (data)=>{
        this.nombre=data.estudiante.nombre;
        this.codigo=data.estudiante.codigo;
        this.correo=data.estudiante.correo;
        this.celular=data.estudiante.celular;
        this.escuela=data.estudiante.escuela;
      },
      (err)=>{
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }
    );
  }

  ngOnInit(): void {
  }

  actualizarEstudiante():void {
    this.servicioUsuario.actualizarEstudiante({'usuario':this.usuario,'nombre':this.nombre,'codigo':this.codigo,'correo':this.correo,'celular':this.celular,'escuela':this.escuela}).subscribe(
      (data)=>{
        console.log(data.mensaje)
        this.router.navigate(['estudiante/'+this.usuario]);
      },
      (err)=>{
        this.mensajeErrorVisible=true;
        this.mensajeError=err.error.mensaje;
      }
    );
  }

  cancelar():void {
    this.router.navigate(['estudiante/'+this.usuario]);
  }
}
