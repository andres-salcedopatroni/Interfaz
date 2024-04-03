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
  mostrarTweets:boolean=false;
  mostrar:boolean=false;
  t_Mensajes:any;
  

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 
    
    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerEstudiante(this.usuario).subscribe(
      (data)=>{
        this.mostrar=true;
        //Pie Chart
        var t_TweetsDepresivos=0;
        var t_TweetsNoDepresivos=0;
        //Scatter Chart
        var f_TweetsDepresivos:any=[];
        var v__TweetsDepresivos:any=[];
        var f_TweetsNoDepresivos:any=[];
        var v__TweetsNoDepresivos:any=[];
        //Otros
        this.estudiante=data.estudiante;
        this.mensajes=data.tweets;
        this.t_Mensajes=data.tweets;
        var graficoDatosDepresivos:any=[];
        var graficoDatosNoDepresivos:any=[];
        //Clasificando mensajes
        for (var value of this.mensajes) {
          var fecha_peru = new Date(value.fecha)
          var fecha_prueba=this.obtenerFechaInicioDia(fecha_peru)
          if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1 && f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
            if(value.estado==1){
              t_TweetsDepresivos= t_TweetsDepresivos + 1;
              f_TweetsDepresivos.push(fecha_prueba.getTime());
              v__TweetsDepresivos.push(1);
            }
            else{
              t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
              f_TweetsNoDepresivos.push(fecha_prueba.getTime());
              v__TweetsNoDepresivos.push(1);
            }
          }
          else{
            if(value.estado==1){
              if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1){
                t_TweetsDepresivos= t_TweetsDepresivos + 1;
                f_TweetsDepresivos.push(fecha_prueba.getTime());
                v__TweetsDepresivos.push(1);
              }
              else{
                var index=f_TweetsDepresivos.indexOf(fecha_prueba.getTime());
                v__TweetsDepresivos[index]=v__TweetsDepresivos[index]+1;
              }
            }
            else{
              if(f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
                t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
                f_TweetsNoDepresivos.push(fecha_prueba.getTime());
                v__TweetsNoDepresivos.push(1);
              }
              else{
                var index=f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime());
                v__TweetsNoDepresivos[index]=v__TweetsNoDepresivos[index]+1;
              }
            }
          }
        }
        for (var value of f_TweetsDepresivos) {
          var index=f_TweetsDepresivos.indexOf(value);
          graficoDatosDepresivos.push([f_TweetsDepresivos[index],v__TweetsDepresivos[index]]);
        }
        for (var value of f_TweetsNoDepresivos) {
          var index=f_TweetsNoDepresivos.indexOf(value);
          graficoDatosNoDepresivos.push([f_TweetsNoDepresivos[index],v__TweetsNoDepresivos[index]]);
        }
        if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
          this.mostrarTweets=true;
          this.dibujarScatterChart(t_TweetsDepresivos,t_TweetsNoDepresivos,graficoDatosDepresivos,graficoDatosNoDepresivos,'grafica_3','Todos los tweets')
          this.dibujarPieChart(t_TweetsDepresivos,t_TweetsNoDepresivos,'grafica','Todos los tweets');
        }
      },
      (error)=>{}
    );

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
      var seriesPieData = [{
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
        credits: {
          enabled: false
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
              format: '{point.percentage:.1f} %',
              distance: -25
            },
            showInLegend: true,
          }
        },
        colors:['#CC6666','#88DC65'],
        series: [{
          name: 'Tweets',
          colorByPoint: true,
          data: seriesPieData
        }]
      };
      Highcharts.chart(identificador,caracteristicas)
    }
  }

  dibujarScatterChart(t_TweetsDepresivos:number,t_TweetsNoDepresivos:number,s_TweetsDepresivos:any,s_TweetsNoDepresivos:any,identificador:string,titulo:string): void{

    if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
      var seriesScatterData = [{
        name: 'Tweets depresivos',
        id: 'tweets_depresivos',
        marker: {
          symbol: 'circle'
        },
        data:s_TweetsDepresivos
      },{
        name: 'Tweets no depresivos',
        id: 'tweets_no_depresivos',
        marker: {
          symbol: 'circle'
        },
        data:s_TweetsNoDepresivos
      }];
      var caracteristicas:any = {
        chart: {
          type: 'scatter',
        },
        title: {
          text: titulo
        },
        tooltip: {
          pointFormat: '<b>Fecha: {point.x:%d-%m-%Y}<br>Nro. Tweets: {point.y}</b>'
        },
        credits: {
          enabled: false
        },
        colors:['#CC6666','#88DC65'],
        xAxis: {
          type: 'datetime',
          dateTimeLabelFormats: {
            minute: '%d %b %Y'
          }, 
          startOnTick: true,
          endOnTick: true,
          showLastLabel: true,},
          series: seriesScatterData
        }
        Highcharts.chart(identificador,caracteristicas); 
      }

  }

  ngOnInit(): void {
  }

  defecto(): void {
    this.mensajes=this.t_Mensajes;
    var f_TweetsDepresivos:any=[];
    var v__TweetsDepresivos:any=[];
    var f_TweetsNoDepresivos:any=[];
    var v__TweetsNoDepresivos:any=[];
    var t_TweetsDepresivos=0;
    var t_TweetsNoDepresivos=0;
    var graficoDatosDepresivos:any=[];
    var graficoDatosNoDepresivos:any=[];
    this.mostrarTweets=false;
    for (var value of this.mensajes) {
      var fecha_peru = new Date(value.fecha)
      var fecha_prueba=this.obtenerFechaInicioDia(fecha_peru)
      if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1 && f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
        if(value.estado==1){
          t_TweetsDepresivos= t_TweetsDepresivos + 1;
          f_TweetsDepresivos.push(fecha_prueba.getTime());
          v__TweetsDepresivos.push(1);
        }
        else{
          t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
          f_TweetsNoDepresivos.push(fecha_prueba.getTime());
          v__TweetsNoDepresivos.push(1);
        }
      }
      else{
        if(value.estado==1){
          if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1){
            t_TweetsDepresivos= t_TweetsDepresivos + 1;
            f_TweetsDepresivos.push(fecha_prueba.getTime());
            v__TweetsDepresivos.push(1);
          }
          else{
            var index=f_TweetsDepresivos.indexOf(fecha_prueba.getTime());
            v__TweetsDepresivos[index]=v__TweetsDepresivos[index]+1;
          }
        }
        else{
          if(f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
            t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
            f_TweetsNoDepresivos.push(fecha_prueba.getTime());
            v__TweetsNoDepresivos.push(1);
          }
          else{
            var index=f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime());
            v__TweetsNoDepresivos[index]=v__TweetsNoDepresivos[index]+1;
          }
        }
      }
    }
    for (var value of f_TweetsDepresivos) {
      var index=f_TweetsDepresivos.indexOf(value);
      graficoDatosDepresivos.push([f_TweetsDepresivos[index],v__TweetsDepresivos[index]]);
    }
    for (var value of f_TweetsNoDepresivos) {
      var index=f_TweetsNoDepresivos.indexOf(value);
      graficoDatosNoDepresivos.push([f_TweetsNoDepresivos[index],v__TweetsNoDepresivos[index]]);
    }
    if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
      this.mostrarTweets=true;
      this.dibujarScatterChart(t_TweetsDepresivos,t_TweetsNoDepresivos,graficoDatosDepresivos,graficoDatosNoDepresivos,'grafica_3','Todos los tweets')
      this.dibujarPieChart(t_TweetsDepresivos,t_TweetsNoDepresivos,'grafica','Todos los tweets');
    }
  }
  mes(): void {
    this.mensajes=[];
    var mes_anterior= new Date();
    mes_anterior.setMonth(mes_anterior.getMonth()-1)
    mes_anterior=this.obtenerFechaInicioDia(mes_anterior)
    console.log(mes_anterior)
    for(var value of this.t_Mensajes){
      var fecha_peru = new Date(value.fecha);
      if(mes_anterior<=fecha_peru){
        this.mensajes.push(value)
      } 
    }
    var f_TweetsDepresivos:any=[];
    var v__TweetsDepresivos:any=[];
    var f_TweetsNoDepresivos:any=[];
    var v__TweetsNoDepresivos:any=[];
    var t_TweetsDepresivos=0;
    var t_TweetsNoDepresivos=0;
    var graficoDatosDepresivos:any=[];
    var graficoDatosNoDepresivos:any=[];
    this.mostrarTweets=false;
    for (var value of this.mensajes) {
      var fecha_peru = new Date(value.fecha)
      var fecha_prueba=this.obtenerFechaInicioDia(fecha_peru)
      if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1 && f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
        if(value.estado==1){
          t_TweetsDepresivos= t_TweetsDepresivos + 1;
          f_TweetsDepresivos.push(fecha_prueba.getTime());
          v__TweetsDepresivos.push(1);
        }
        else{
          t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
          f_TweetsNoDepresivos.push(fecha_prueba.getTime());
          v__TweetsNoDepresivos.push(1);
        }
      }
      else{
        if(value.estado==1){
          if(f_TweetsDepresivos.indexOf(fecha_prueba.getTime())==-1){
            t_TweetsDepresivos= t_TweetsDepresivos + 1;
            f_TweetsDepresivos.push(fecha_prueba.getTime());
            v__TweetsDepresivos.push(1);
          }
          else{
            var index=f_TweetsDepresivos.indexOf(fecha_prueba.getTime());
            v__TweetsDepresivos[index]=v__TweetsDepresivos[index]+1;
          }
        }
        else{
          if(f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime())==-1){
            t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1;
            f_TweetsNoDepresivos.push(fecha_prueba.getTime());
            v__TweetsNoDepresivos.push(1);
          }
          else{
            var index=f_TweetsNoDepresivos.indexOf(fecha_prueba.getTime());
            v__TweetsNoDepresivos[index]=v__TweetsNoDepresivos[index]+1;
          }
        }
      }
    }
    for (var value of f_TweetsDepresivos) {
      var index=f_TweetsDepresivos.indexOf(value);
      graficoDatosDepresivos.push([f_TweetsDepresivos[index],v__TweetsDepresivos[index]]);
    }
    for (var value of f_TweetsNoDepresivos) {
      var index=f_TweetsNoDepresivos.indexOf(value);
      graficoDatosNoDepresivos.push([f_TweetsNoDepresivos[index],v__TweetsNoDepresivos[index]]);
    }
    if(t_TweetsDepresivos+t_TweetsNoDepresivos>0){
      this.mostrarTweets=true;
      this.dibujarScatterChart(t_TweetsDepresivos,t_TweetsNoDepresivos,graficoDatosDepresivos,graficoDatosNoDepresivos,'grafica_3','Tweets del ultimo mes')
      this.dibujarPieChart(t_TweetsDepresivos,t_TweetsNoDepresivos,'grafica','Tweets del ultimo mes');
    }
  }

  eliminar(): void {
    this.router.navigate(['eliminar-estudiante/'+this.estudiante.usuario]);
  }

  actualizar(): void {
    this.router.navigate(['modificar-estudiante/'+this.estudiante.usuario]);
  }
}
