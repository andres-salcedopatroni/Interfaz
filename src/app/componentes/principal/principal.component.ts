import { Component, OnInit } from '@angular/core';
import { AnalisisService } from 'src/app/services/analisis.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit {

  usuarios:any;
  resultados:any;
  lista_id:any=[];
  
  constructor(private servicioAnalisis: AnalisisService) { 

    this.usuarios=[{"nombre":0}]

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
