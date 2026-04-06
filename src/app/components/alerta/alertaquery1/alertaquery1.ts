import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { AlertaService } from '../../../services/alerta-service';

@Component({
  selector: 'app-alertaquery1',
  imports: [MatIconModule, BaseChartDirective],
  templateUrl: './alertaquery1.html',
  styleUrl: './alertaquery1.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Alertaquery1 implements OnInit {
 hasData = false;

  barchartOptions: ChartOptions = {
    responsive: true
     };
     barChartLabels: string[] = [];
  barChartType: ChartType = 'doughnut';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private aS: AlertaService) { }
 ngOnInit(): void {
    this.aS.getCount().subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map(item => item.idUsuario.toString());
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadAlertasPendientes),
            label: 'Cantidad de Alertas Pendientes',
            backgroundColor: [
              'rgb(242,94,35)',
              'rgb(238,122,75)'
            ],
          },
        ];
      } else {
        this.hasData = false;
      }
    });
  }
}
