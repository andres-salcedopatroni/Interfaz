import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import * as Highcharts from 'highcharts';


declare var require: any;
let Boost = require('highcharts/modules/boost');
let noData = require('highcharts/modules/no-data-to-display');
let More = require('highcharts/highcharts-more');

Boost(Highcharts);
noData(Highcharts);
More(Highcharts);
noData(Highcharts);

@Component({
  selector: 'app-ver-estudiante',
  templateUrl: './ver-estudiante.component.html',
  styleUrls: ['./ver-estudiante.component.css']
})
export class VerEstudianteComponent implements OnInit {

  estudiante:any;
  usuario:any;
  mensajes:any;
  fechas:any=[];
  public options: any = {
    chart: {
      type: 'scatter',
    },
    title: {
      text: 'Sample Scatter Plot'
    },
    credits: {
      enabled: false
    },
    xAxis: {
      type: 'datetime',},
    series: [
      {
        name: 'Abnormal',
        turboThreshold: 500000,
        data: [[new Date('2018-02-05 18:38:31'), 7],[new Date('2018-02-05 18:38:30'), 6]]
      }
    ]
  }

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 

    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerUsuario(this.usuario).subscribe(
      (data)=>{
        this.estudiante=data.estudiante;
        this.mensajes=data.tweets;
      },
      (error)=>{});
    
  }

  ngOnInit(): void {
   Highcharts.chart('grafica', this.options); 
  }

  

}
