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
  graficoDatos:any=[];
  mostrar:boolean=false;
  options: any = {
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
      type: 'datetime',
      dateTimeLabelFormats: {
        minute: '%d %b %Y'
    }, startOnTick: true,
    endOnTick: true,
    showLastLabel: true,},
    series: [
      {
        name: 'Abnormal',
        data: this.graficoDatos
      }
    ]
  }

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 

    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerUsuario(this.usuario).subscribe(
      (data)=>{
        this.mostrar=true;
        this.estudiante=data.estudiante;
        this.mensajes=data.tweets;
        var fechas:any=[];
        var valores:any=[];
        for (var value of this.mensajes) {
          if(fechas.indexOf(value.fecha)==-1){
            fechas.push(value.fecha);
            valores.push(value.estado);
          }
          else{
            var index=fechas.indexOf(value.fecha);
            valores[index]=valores[index]+value.estado;
          }
        }
        for (var value of fechas) {
          var index=fechas.indexOf(value);
          this.graficoDatos.push([new Date(fechas[index]).getTime(),valores[index]]);
        }
        Highcharts.chart('grafica', this.options); 
      },
      (error)=>{});
    
  }

  ngOnInit(): void {
    console.log(this.graficoDatos);
    
   Highcharts.chart('grafica', this.options); 
  }

  

}
