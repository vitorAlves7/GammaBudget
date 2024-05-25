import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  title?: any;
  plotOptions?: any;
  fill?: any;
  legend?: any;
  dataLabels?: any;
  tooltip?: any;
  grid?: any;
  yaxis?: any;
  stroke?: any;
  states?: any;
};

@Component({
  selector: 'app-home-chart',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './home-chart.component.html',
  styleUrls: ['./home-chart.component.scss']
})
export class HomeChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> = {};

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Receitas",
          color: '#007E71',
          data: [
            { x: "Jan", y: 3000.30 },
            { x: "Fev", y: 3000 },
            { x: "Mar", y: 3000 },
            { x: "Abr", y: 0 },
            { x: "Mai", y: 0 },
            { x: "Jun", y: 3000 },
            { x: "Jul", y: 3000 },
            { x: "Ago", y: 3000 },
            { x: "Set", y: 0 },
            { x: "Out", y: 3000 },
            { x: "Nov", y: 3000 },
            { x: "Dez", y: 3000 },
          ],
        },
        {
          name: "Despesas",
          color: "#F05252",
          data: [
            { x: "Jan", y: 231 },
            { x: "Fev", y: 122 },
            { x: "Mar", y: 63 },
            { x: "Abr", y: 150 },
            { x: "Mai", y: 122 },
            { x: "Jun", y: 323 },
            { x: "Jul", y: 0 },
            { x: "Ago", y: 111 },
            { x: "Set", y: 111 },
            { x: "Out", y: 0 },
            { x: "Nov", y: 111 },
            { x: "Dez", y: 0 },
          ],
        },
      ],
      chart: {
        type: "bar",
        height: "500px",
        fontFamily: "Roboto, Open-Sans",
        toolbar: {
          show: true,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadiusApplication: "end",
          borderRadius: 8,
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        style: {
          fontFamily: "Roboto, Open-Sans",
        },
        y: {
            formatter: function (val: number) {
              return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
          }
        
      },
      states: {
        hover: {
          filter: {
            type: "darken",
            value: 1,
          },
        },
      },
      stroke: {
        show: true,
        width: 0,
        colors: ["transparent"],
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: -14,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: true,
        position: 'top'
      },
      xaxis: {
        floating: false,
        labels: {
          show: true,
          style: {
            fontFamily: "Roboto, Open-Sans",
            cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400',
          },
         
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        show: false,
      },
      fill: {
        opacity: 1,
      },
      
    };
  }

  ngOnInit(): void {}
}
