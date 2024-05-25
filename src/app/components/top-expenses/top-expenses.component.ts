import { CommonModule } from '@angular/common';
import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: any,
  chart: any,
  xaxis: any,
  title?: any,
  plotOptions?: any,
  fill?: any,
  legend?: any,
  dataLabels?: any,
  tooltip?: any,
  grid?: any,
  yaxis?: any,
};

@Component({
  selector: 'app-top-expenses',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './top-expenses.component.html',
  styleUrls: ['./top-expenses.component.scss']
})
export class TopExpensesComponent implements OnInit {

  @ViewChild("chart") chart: ChartComponent | undefined;
  public chartOptions: Partial<ChartOptions> = {};

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      series: [
        {
          name: "Despesas",
          data: [1000, 600, 520, 141.50],
          color: "#F05252"
        }
      ],
      chart: {
        type: "bar",
        width: "100%",
        height: 500,
        toolbar: {
          show: true,
        }
      },
      fill: {
        opacity: 1,
      },
      plotOptions: {
        bar: {
          horizontal: true,
          columnWidth: "100%",
          borderRadiusApplication: "end",
          borderRadius: 6,
          dataLabels: {
            position: "top",
          },
        },
      },
      legend: {
        show: true,
        position: "bottom",
      },
      dataLabels: {
        enabled: false,
      },
      tooltip: {
        shared: true,
        intersect: false,
      },
      xaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Roboto, Open-sans",
            cssClass: 'text-xs font-normal fill-gray-500'
          },
          formatter: function(value: any) {
            return value;
          }
        },
        categories: ["Agua", "Luz", "Comida", "Ração"],
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
      },
      yaxis: {
        labels: {
          show: true,
          style: {
            fontFamily: "Roboto, Open-sans",
            cssClass: 'text-xs font-normal fill-gray-500'
          }
        }
      },
      grid: {
        show: true,
        strokeDashArray: 4,
        padding: {
          left: 3,
          right: 2,
          top: -20
        },
      },
    };
  }
}
