import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-ver-estudiante',
  templateUrl: './ver-estudiante.component.html',
  styleUrls: ['./ver-estudiante.component.css']
})
export class VerEstudianteComponent implements OnInit {

  estudiante:any;
  usuario:any;

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 

    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerUsuario(this.usuario).subscribe(
      (data)=>{
        this.estudiante=data;
      },
      (error)=>{});


  }

  ngOnInit(): void {
  }

  

}
