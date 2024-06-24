import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { Expense } from '../../types/expense-type';
import { ChartComponent, NgApexchartsModule} from 'ng-apexcharts';


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
  selector: 'app-top-expenses',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './top-expenses.component.html',
  styleUrls: ['./top-expenses.component.scss']
})
export class TopExpensesComponent implements OnInit{

  
  @ViewChild("chart") chart: ChartComponent | any;
  public chartOptions: Partial<ChartOptions> = {};


  expenses: Expense[] = [];

  constructor(private expenseService: ExpensesService) {


    this.expenseService.getExpensesList().subscribe(
      (response: Expense[]) => {
        this.expenses = this.filterTopExpenses(response);
    
      
        this.chartOptions = {
          series: [
            {
              name: "Despesas",
              data: this.expenses.map(expense => expense.amount),
              color: "#F05252"
            }
          ],
          chart: {
            type: "bar",
            width: "100%",
            height: "400",
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
            y: {
              formatter: function (val: number) {
                return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
              }
            }
          },
          xaxis: {
            labels: {
              show: true,
              style: {
                cssClass: 'text-sm font-semibold fill-gray-600'
              }
            },
            categories: this.expenses.map(expense => expense.name),
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
            },
          },
          yaxis: {
            labels: {
              show: true,
              style: {
                cssClass: 'text-sm font-semibold fill-gray-500',
              }
            }
          },
          grid: {
            show: false,
            strokeDashArray: 4,
            padding: {
              left: 50,
              right: 2,
              top: -20
            },
          },
        };
        
    },
    );


   
  }
  ngOnInit(): void {
    
  }




 
    
  
  
  filterTopExpenses(expenses: Expense[]): Expense[] {
    expenses.forEach(expense => {
      expense.amount = Math.abs(expense.amount);
    });

    expenses.sort((a, b) => b.amount - a.amount);
    return expenses.slice(0, 4);
  }

}
