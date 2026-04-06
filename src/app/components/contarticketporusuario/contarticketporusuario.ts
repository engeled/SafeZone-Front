import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { TicketSoporteService } from '../../services/ticket-soporte-service';

@Component({
  selector: 'app-contarticketporusuario',
  imports: [MatIconModule,BaseChartDirective],
  templateUrl: './contarticketporusuario.html',
  styleUrl: './contarticketporusuario.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Contarticketporusuario implements OnInit{
  hasData=false;

  barChartOptions:ChartOptions={
    responsive:true,
  };
  barChartLabels:string[]=[];
  barChartType:ChartType='bar';
  barChartLegend=true;
  barChartData:ChartDataset[]=[];

  constructor(private tS:TicketSoporteService){}

  ngOnInit():void{
    this.tS.getContar().subscribe((data)=>{
      if(data.length>0){
        this.hasData=true;
        this.barChartLabels = data.map(item => item.username);
        this.barChartData = [{
          data: data.map(item => item.total_Tickets),
          label: 'Cantidad de Tickets por Usuario',
          backgroundColor: ['cyan', 'purple', 'green', 'red'],
       }];
      }else{
        this.hasData=false;
      }
    });
  }
}
