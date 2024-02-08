import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-ver-estudiante',
  templateUrl: './ver-estudiante.component.html',
  styleUrls: ['./ver-estudiante.component.css']
})
export class VerEstudianteComponent implements OnInit {

  estudiante:any;
  usuario:any;
  chartOptions: Highcharts.Options = {
    series: [
      {
        type: "line",
        data: [1, 2, 3, 4, 5]
      }
    ]
};

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 

    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerUsuario(this.usuario).subscribe(
      (data)=>{
        this.estudiante=data;
      },
      (error)=>{});
    let chart =new Highcharts.Chart('container', this.chartOptions)
    

  }

  ngOnInit(): void {
  }

  

}
