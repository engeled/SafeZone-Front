import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { TicketSoporteService } from '../../services/ticket-soporte-service';
import { reduce } from 'rxjs';

@Component({
  selector: 'app-cantidadrespuestatickets',
  imports: [MatIconModule,BaseChartDirective],
  templateUrl: './cantidadrespuestatickets.html',
  styleUrl: './cantidadrespuestatickets.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Cantidadrespuestatickets implements OnInit {
  hasData=false;

  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels:string[]=[];
  barChartType:ChartType='pie';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];

  constructor(private tS:TicketSoporteService){}

  ngOnInit():void{
    this.tS.getCantidad().subscribe((data)=>{
      if(data.length>0){
        this.hasData=true;
        this.barChartLabels = data.map(item => item.asunto);
        this.barChartData = [{
          data: data.map(item => item.idRespuestaSoporte),
          label: 'Cantidad de respuestas por Ticket',
          backgroundColor: ['orange', 'blue', 'green', 'purple','red','yellow'],
       }];
      }else{
        this.hasData=false;
      }
    });
  }
}
