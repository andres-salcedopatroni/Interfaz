import { Component } from '@angular/core';
import { UsersService } from './services/users.service';
import { AnalisisService } from './services/analisis.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  
  title = 'Interfaz';
  usuarios:any;
  resultados:any;
  lista_id:any=[];

  constructor(private servicioUsuario: UsersService, private servicioAnalisis: AnalisisService){ 
    
    this.usuarios=[{"nombre":0}]
    /*this.servicioUsuario.obtenerUsuarios().subscribe(
      (data)=> {
        this.usuarios=data
      },(error)=> {
        console.log(error)
      }   
    )*/

  }
  
  analizar(){
    
    const field:any="usuario"
    for (let u of this.usuarios) {
      let user:any=u
      this.lista_id.push( user.usuario)
      console.log(this.usuarios)
      console.log(this.lista_id)
    }
    this.servicioAnalisis.analizar({"usuarios":this.lista_id}).subscribe(
      (data)=> {
        this.resultados=data
        console.log(this.resultados)
      },(error)=> {
        console.log(error)
      }   
    )
  }

}
