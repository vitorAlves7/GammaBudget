import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { Expense } from '../../types/expense-type';
import { IncomingsService } from '../../services/incomings/incomings.service';
import { Incoming } from '../../types/incoming-type';
import { ExpensesService } from '../../services/expenses/expenses.service';


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

  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> = {};

  expenses: Expense[] = []
  incomings: Incoming[] = []
  sumIncomingsMonth: number[] = []
  sumExpensesMonth: number[] = []


  constructor(private incomingsService: IncomingsService, private expensesService: ExpensesService) {

  }



  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.incomingsService.getIncomingList().subscribe(
      (incomings: Incoming[]) => {
        this.incomings = incomings;
        this.sumIncomingsMonth = this.calculateMonthlyIncomings(this.incomings);
        this.updateChart();
      }
    );

    this.expensesService.getExpensesList().subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        this.sumExpensesMonth = this.calculateMonthlyExpenses(this.expenses);
        this.updateChart();
      }
    );
  }

  updateChart(): void {
    if (this.sumIncomingsMonth.length > 0 && this.sumExpensesMonth.length > 0) {
      const months = this.getMonths();
      this.chartOptions = {
        series: [
          {
            name: "Receitas",
            color: '#007E71',
            data: this.sumIncomingsMonth.map((value, index) => ({
              x: months[index],
              y: value
            })),
          },
          {
            name: "Despesas",
            color: "#F05252",
            data: this.sumExpensesMonth.map((value, index) => ({
              x: months[index],
              y: value
            })),
          },
        ],
        chart: {
          type: "bar",
          height: "500px",
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
              cssClass: 'text-xs font-normal fill-gray-500',
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
  }


  calculateMonthlyExpenses(expenses: Expense[]): number[] {

    const monthlyExpenses: number[] = new Array(12).fill(0);
    const currentYear: number = new Date().getFullYear();

    expenses.forEach(expense => {

      const expenseDate = new Date(expense.expiration_date);
      const monthIndex = expenseDate.getMonth();
      if (expenseDate.getFullYear() == currentYear) {
        monthlyExpenses[monthIndex] += Math.abs(expense.amount);
      }


    });
    return monthlyExpenses;
  }

  calculateMonthlyIncomings(incomings: Incoming[]): number[] {
    const monthlyIncomings: number[] = new Array(12).fill(0);
    const currentYear: number = new Date().getFullYear();
    
    incomings.forEach(incoming => {
      const incomingDate = new Date(incoming.launch_date);
      const monthIndex = incomingDate.getMonth();

      if (incomingDate.getFullYear() == currentYear) {
        monthlyIncomings[monthIndex] += incoming.amount;
      }
    });

    return monthlyIncomings;
  }

  getMonths(): string[] {
    return [
      "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
      "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
    ];
  }

  teste(){
    console.log('teste');
  }


}
