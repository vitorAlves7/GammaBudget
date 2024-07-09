import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: any;
  chart: any;
  xaxis: any;
  dataLabels: any;
  plotOptions: any;
  title: any;
};

@Component({
  selector: 'app-daily-chart',
  templateUrl: './daily-chart.component.html',
  styleUrls: ['./daily-chart.component.scss'],
  standalone: true,
  imports: [NgApexchartsModule],
})
export class DailyChartComponent  {
  public chartOptions: Partial<ChartOptions>; 
  
  @Input() selectedMonth:any; // Mês atual
  @Input() selectedYear:any; // Ano atual

  @Output() monthYearChanged: EventEmitter<{ month: number, year: number }> = new EventEmitter();



  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Receita",
          data: this.generateData(),
          color: '#007E71'
        },
        { 
          name: "Despesa",
          data: this.generateData(),
          color: '#FF0606'
        }
      ],
      chart: {
        type: "bar",
        height: 350
      },
      plotOptions: {
        bar: {
          distributed: false,
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


  private generateData(): number[] {
    this.getDiasNoMes();  
    return Array.from({ length: 31}, () => Math.floor(Math.random() * 100));
  }

  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
  }

  getDiasNoMes() {
    console.log('selectedMonth =', this.selectedMonth);
    console.log('selectedYear = ', this.selectedYear);
    // const data = new Date(this.inputAno, this.inputMes, 0);
    // console.log('Ano = ', this.inputAno);
    // console.log('Mês = ', this.inputMes);

    // console.log('Dias = ', data.getDate())
    // return data.getDate();
  }

}
