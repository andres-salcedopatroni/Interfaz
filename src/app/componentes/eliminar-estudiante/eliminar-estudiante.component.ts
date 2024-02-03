import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-eliminar-estudiante',
  templateUrl: './eliminar-estudiante.component.html',
  styleUrls: ['./eliminar-estudiante.component.css']
})
export class EliminarEstudianteComponent implements OnInit {

  usuarios:any;
  resultados:any;
  lista_id:any=[];
  
  constructor(private servicioUsuario: UsersService,private servicioAnalisis: AnalisisService) { 

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

  analizar(): void{
    
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
