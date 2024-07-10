import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { DailyChartComponent } from '../../components/daily-chart/daily-chart.component';
import { Expense } from '../../types/expense-type';
import { IncomingsService } from '../../services/incomings/incomings.service';
import { Incoming } from '../../types/incoming-type';
import { ExpensesService } from '../../services/expenses/expenses.service';
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
  selector: 'reports',
  standalone: true,
  imports: [
    NavbarComponent,
    MonthSelectorComponent,
    MonthYearFilterPipe,
    DailyChartComponent,
    NgApexchartsModule
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit {
  public chartOptions: Partial<ChartOptions> = {}; 
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  isTabOpen: boolean = true;

  expenses: Expense[] = []
  incomings: Incoming[] = []

  limit_date: string = '';


  constructor(private incomingsService: IncomingsService, private expensesService: ExpensesService) {
    // this.chartOptions = {
    //   series: [
    //     {
    //       name: "Receita",
    //       data: this.generateData(),
    //       color: '#007E71'
    //     },
    //     { 
    //       name: "Despesa",
    //       data: this.generateData(),
    //       color: '#FF0606'
    //     }
    //   ],
    //   chart: {
    //     type: "bar",
    //     height: 350
    //   },
    //   plotOptions: {
    //     bar: {
    //       distributed: false,
    //       horizontal: false,
    //       columnWidth: '55%'
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   title: {
    //     text: "Despesas por Dia do Mês",
    //     align: "left"
    //   },
    //   xaxis: {
    //     categories: Array.from({ length: this.getDiasNoMes() }, (_, i) => (i + 1).toString())
    //   }
    // };
  }

  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.getDiasNoMes();
    this.updateChart();
    console.log('selecteMonth reports = ', this.selectedMonth);
    console.log('selectedYear reports = ', this.selectedYear);
    this.limit_date = `${this.selectedYear}-${(this.selectedMonth+1).toString().padStart(2, '0')}-${'10'}`;
  }

  toggleTab() {
    this.isTabOpen = !this.isTabOpen;
  }

  ngOnInit(): void {
    this.loadChartData();
  }

  loadChartData(): void {
    this.incomingsService.getIncomingList().subscribe(
      (incomings: Incoming[]) => {
        this.incomings = incomings;
        console.log('incomings = ', this.incomings)
        this.updateChart();
        // this.sumIncomingsMonth = this.calculateMonthlyIncomings(this.incomings);
        // this.updateChart();
      }
    );

    this.expensesService.getExpensesList().subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        console.log('expenses = ', this.expenses)
        // this.sumExpensesMonth = this.calculateMonthlyExpenses(this.expenses);
        this.updateChart();
      }
    );
  }

  private generateData(): number[] {
    this.getDiasNoMes();
    return Array.from({ length: this.getDiasNoMes()}, () => 0);
  }

  updateChart(): void {
    const arrData = Array.from({ length: this.getDiasNoMes() }, (_, i) => (i + 1).toString());
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
        categories: Array.from({ length: this.getDiasNoMes() }, (_, i) => (i + 1).toString())
      }
    };

  }

  getDiasNoMes() {
    console.log('selectedMonth =', this.selectedMonth);
    console.log('selectedYear = ', this.selectedYear);
    const data = new Date(this.selectedYear, this.selectedMonth + 1, 0).getDate();
    console.log('data = ', data);
    return data;
    // const data = new Date(this.inputAno, this.inputMes, 0);
    // console.log('Ano = ', this.inputAno);
    // console.log('Mês = ', this.inputMes);

    // console.log('Dias = ', data.getDate())
    // return data.getDate();
  }
}
