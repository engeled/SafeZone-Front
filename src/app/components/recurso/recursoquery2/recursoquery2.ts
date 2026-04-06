import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective, provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { RecursoService } from '../../../services/recurso-service';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-recursoquery2',
  imports: [MatIconModule, BaseChartDirective,MatFormFieldModule,FormsModule,MatInputModule],
  templateUrl: './recursoquery2.html',
  styleUrl: './recursoquery2.css',
  providers: [provideCharts(withDefaultRegisterables())],
})
export class Recursoquery2 {
hasData = false;
username: string = '';
  barchartOptions: ChartOptions = {
    responsive: true
     };
     barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private rS: RecursoService) { }
 ngOnInit(): void {
  if (!this.username) {
    this.hasData = false;
    return;
  }
    this.rS.getCount(this.username).subscribe((data) => {
      if (data.length > 0) {
        this.hasData = true;
        this.barChartLabels = data.map(item => item.username);
        this.barChartData = [
          {
            data: data.map((item) => item.cantidadRecuursos),
            label: 'Cantidad de Recursos por usuario',
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
