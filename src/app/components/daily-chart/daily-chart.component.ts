import { Component, OnInit } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexPlotOptions
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-daily-chart',
  standalone: true,
  imports: [],
  templateUrl: './daily-chart.component.html',
  styleUrl: './daily-chart.component.scss'
})
export class DailyChartComponent implements OnInit{
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Despesas",
          data: this.generateData()
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%'
        },
      },
      dataLabels: {
        enabled: false
      },
      title: {
        text: "Despesas por Dia do Mês",
        align: "left"
      },
      xaxis: {
        categories: Array.from({ length: 31 }, (_, i) => (i + 1).toString())
      }
    };
  }

  ngOnInit(): void {}

  private generateData(): number[] {
    return Array.from({ length: 31 }, () => Math.floor(Math.random() * 100));
  }

}
