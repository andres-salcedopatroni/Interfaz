import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-modificar-estudiante',
  templateUrl: './modificar-estudiante.component.html',
  styleUrls: ['./modificar-estudiante.component.css']
})
export class ModificarEstudianteComponent {
  usuarios:any;
  resultados:any;
  lista_id:any=[];
  
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
}
