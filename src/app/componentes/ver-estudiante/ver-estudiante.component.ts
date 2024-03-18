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
  mostrarPieChart1:boolean=false;
  mostrarPieChart2:boolean=false;
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
      var t_TweetsDepresivos=0;
      var t_TweetsDepresivosMensual=0;
      var t_TweetsNoDepresivos=0;
      var t_TweetsNoDepresivosMensual=0;
      var mes_anterior= new Date();
      mes_anterior.setMonth(mes_anterior.getMonth()-1)
      mes_anterior=this.obtenerFechaInicioDia(mes_anterior)
        this.estudiante=data.estudiante;
        this.mensajes=data.tweets;
        console.log(data.tweets);
        var fechas:any=[];
        var valores:any=[];
        for (var value of this.mensajes) {
          var fecha_peru = new Date(value.fecha)
          if(value.estado==1){
            t_TweetsDepresivos= t_TweetsDepresivos + 1
            if(mes_anterior<=fecha_peru)
            t_TweetsDepresivosMensual=t_TweetsDepresivosMensual+1;
          }
          else{
            t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1
            if(mes_anterior<=fecha_peru)
            t_TweetsNoDepresivosMensual=t_TweetsNoDepresivosMensual+1;
          }
          var fecha_prueba=this.obtenerFechaInicioDia(fecha_peru)
          console.log(value.fecha)
          console.log(fecha_prueba)
          if(fechas.indexOf(fecha_prueba.getTime())==-1){
            fechas.push(fecha_prueba.getTime());
            valores.push(value.estado);
          }
          else{
            var index=fechas.indexOf(fecha_prueba.getTime());
            valores[index]=valores[index]+value.estado;
          }
        }
        for (var value of fechas) {
          var index=fechas.indexOf(value);
          this.graficoDatos.push([fechas[index],valores[index]]);
        }
        if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
          this.mostrarPieChart1=true;
        this.dibujarPieChart(t_TweetsDepresivos,t_TweetsNoDepresivos,'grafica','Total');

      }if(t_TweetsDepresivosMensual+t_TweetsNoDepresivosMensual>0){
        this.mostrarPieChart2=true;
        this.dibujarPieChart(t_TweetsDepresivosMensual,t_TweetsNoDepresivosMensual,'grafica_2','Mensual');
      
      }
        
      },
      (error)=>{});
    
  }

  obtenerFechaInicioDia(fecha:Date): Date{
    
    var mes=''+(fecha.getMonth()+1);
    var dia=''+fecha.getDate();
    if(fecha.getMonth()+1<10)
      mes='0'+ mes;
    if(fecha.getDate()<10)
      dia='0'+ dia;
    var fecha_inicio=new Date(fecha.getFullYear()+'-'+mes+'-'+dia+'T05:00:00.000Z');
    return fecha_inicio;
  
  }

  dibujarPieChart(t_TweetsDepresivos:number,t_TweetsNoDepresivos:number,identificador:string,titulo:string): void{
    
    if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
      var p_TweetsDepresivos = Math.round(t_TweetsDepresivos / (t_TweetsDepresivos + t_TweetsNoDepresivos) * 1000) / 10;
      var p_TweetsNoDepresivos = 100 - p_TweetsDepresivos;
      var seriesPieData=[{
        name: 'Tweets depresivos',
        y: p_TweetsDepresivos,
        selected: true
      }, {
        name: 'Tweets no depresivos',
        y: p_TweetsNoDepresivos
      }];
      var caracteristicas:any = {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: titulo,
          align: 'center'
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
          point: {
            valueSuffix: '%'
          }
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: true,
              format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            },
            size:'80%'
          }
        },
        series: [{
          name: 'Tweets',
          colorByPoint: true,
          data: seriesPieData
        }]
      };
      Highcharts.chart(identificador,caracteristicas)
    }
  }

  dibujarScatterChart(t_TweetsDepresivos:number,t_TweetsNoDepresivos:number,s_TweetsDepresivos:any,identificador:string,titulo:string): void{

    if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
      var seriesScatterData=[{
        name: 'Tweets depresivos',
        id: 'tweets_depresivos',
        marker:{
          symbol: 'circle'
        },
        data:s_TweetsDepresivos
      }]
    }

  }

  ngOnInit(): void {
    console.log(this.graficoDatos);
    
   Highcharts.chart('grafica_3', this.options); 

  }

  eliminarEstudiante(): void{
    
    this.servicioUsuario.eliminarUsuarios({"eliminar":this.usuario}).subscribe(
      (data)=> {
        this.servicioUsuario.obtenerUsuarios().subscribe(
          (data)=> {
          },(error)=> {
            console.log(error)
          }   
        )
      },(error)=> {
        console.log(error)
      }   
    )

   
  }

}
