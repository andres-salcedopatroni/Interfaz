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
  
  pieChartOptions:any={
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: 'Porcentaje de tweets depresivos',
        align: 'center'
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
            }
        }
    },
    series: [{
        name: 'Brands',
        colorByPoint: true,
        data: [{
            name: 'Chrome',
            y: 70.67,
            selected: true
        }, {
            name: 'Edge',
            y: 14.77
        },  {
            name: 'Firefox',
            y: 4.86
        }, {
            name: 'Safari',
            y: 2.63
        }, {
            name: 'Internet Explorer',
            y: 1.53
        },  {
            name: 'Opera',
            y: 1.40
        }, {
            name: 'Sogou Explorer',
            y: 0.84
        }, {
            name: 'QQ',
            y: 0.51
        }, {
            name: 'Other',
            y: 2.6
        }]
    }]
  }

  constructor(private router:Router, private servicioUsuario: UsersService, private route: ActivatedRoute) { 

    this.usuario = this.route.snapshot.paramMap.get('id');
    this.servicioUsuario.obtenerUsuario(this.usuario).subscribe(
      (data)=>{
      this.mostrar=true;
      var t_TweetsDepresivos=0;
        var t_TweetsNoDepresivos=0;
        Highcharts.chart('pieChart', this.pieChartOptions);
        Highcharts.chart('pieChart2', this.pieChartOptions);
        this.estudiante=data.estudiante;
        this.mensajes=data.tweets;
        console.log(data.tweets);
        var fechas:any=[];
        var valores:any=[];
        for (var value of this.mensajes) {
          if(value.estado==1)
            t_TweetsDepresivos= t_TweetsDepresivos + 1
          else
            t_TweetsNoDepresivos = t_TweetsNoDepresivos + 1
          var fecha_peru = new Date(value.fecha)
          var mes=''+(fecha_peru.getMonth()+1);
          var dia=''+fecha_peru.getDate();
          if(fecha_peru.getMonth()+1<10)
          mes='0'+ mes
          if(fecha_peru.getDate()<10)
          dia='0'+ dia
          var fecha_prueba=new Date(fecha_peru.getFullYear()+'-'+mes+'-'+dia+'T05:00:00.000Z')
          console.log(fechas)
          console.log(fechas.indexOf(fecha_prueba))
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
          this.dibujarPieChart('grafica',seriesPieData);
        }
      },
      (error)=>{});
    
  }

  dibujarPieChart(identificador:string,datos:any): void{
    
    var caracteristicas:any = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
        text: 'Porcentaje de tweets depresivos',
        align: 'center'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
          }
        }
      },
      series: [{
        name: 'Brands',
        colorByPoint: true,
        data: datos
      }]
    };
    Highcharts.chart(identificador,caracteristicas);
  }

  ngOnInit(): void {
    console.log(this.graficoDatos);
    
   Highcharts.chart('grafica', this.options); 

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
