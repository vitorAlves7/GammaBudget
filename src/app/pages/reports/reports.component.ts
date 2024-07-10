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
  selector: 'app-reports',
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

  expenses: any[] = []
  incomings: any[] = []

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

  private generateIncomingsData(): number[] {
    this.getDiasNoMes();
    const arrData = Array.from({ length: this.getDiasNoMes()}, () => 0);
    console.log('generete arrData = ', arrData);
    const exp = this.incomings.map(elem => {
      const month = new Date(elem.launch_date).getMonth();
      if(month === this.selectedMonth){
        return {
          ...elem,
          day: new Date(elem.launch_date).getDate(),
        }
      }
    });
  
    exp.forEach((elem) => {
      if(elem?.day){
        arrData[elem.day - 2] += elem.amount;
      }
    })
    console.log('exp = ', arrData);
    return arrData;
  }


  private generateExpensesData(): number[] {
    this.getDiasNoMes();
    const arrData = Array.from({ length: this.getDiasNoMes()}, () => 0);
    console.log('generete arrData = ', arrData);
    const exp = this.expenses.map(elem => {
      const month = elem.expiration_date.split("-");
      if((parseInt(month[1]) - 1) === this.selectedMonth) {
        console.log('caiu aqui');
        console.log('Mês selecionado = ', (parseInt(month[1]) - 1))
        const data = {
          ...elem,
          day: elem.expiration_date.slice(-2),
        }
        console.log('data = ', data);
        return data
      }
    });
    console.log('exp antes do arrData = ',exp);
      exp.forEach((elem) => {
        if(elem?.day){
          arrData[(parseInt(elem.day) -1)] += elem.amount;
        }
      })
    
    console.log('exp = ', arrData);
    return arrData;
  }

  updateChart(): void {
    const arrData = Array.from({ length: this.getDiasNoMes() }, (_, i) => (i + 1).toString());
    console.log('arrData = ', arrData)
    this.chartOptions = {
      series: [
        {
          name: "Receita",
          data: this.generateIncomingsData(),
          color: '#007E71'
        },
        { 
          name: "Despesa",
          data: this.generateExpensesData(),
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
