import { Component, ViewChild } from '@angular/core';
import { Expense } from '../../types/expense-type';
import { ExpensesService } from '../../services/expenses/expenses.service';
import {  NgApexchartsModule } from 'ng-apexcharts';




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
  labels: any;
  responsive: any;

};



@Component({
  selector: 'app-expenses-by-category',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './expenses-by-category.component.html',
  styleUrl: './expenses-by-category.component.scss'
})
export class ExpensesByCategoryComponent {

  

  expenses: Expense[] = [];


  public chartOptions: Partial<ChartOptions>;

  constructor(private expensesService: ExpensesService) {
    this.chartOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut",
        width: '100%', 
        height: 280 
      },
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: '100%', 
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      dataLabels: {
        enabled: true,
        formatter: function (val: number) {
          return val.toFixed(2) + "%";
        },
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
          expandOnClick: false,
          donut: {
            size: "40%",
          },
        },
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter: function (val: number) {
            return val.toFixed(2) + "%";
          },
        }
      },
    };
  }


  ngOnInit(){
    this.expensesService.getExpenses().subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        let groupedData = this.calculateExpenseStats(this.expenses);
        let totalCategories = this.expenses.length;
        let categories = groupedData.map(group => group.category)
        let seriesData = groupedData.map(group => (group.count / totalCategories) * 100);
        this.chartOptions.series=seriesData;
        this.chartOptions.labels=categories;


        
      }
    );
  }
  


  calculateExpenseStats(expenses: Expense[]): { category: string, count: number, percent: number }[] {
    const categoryMap = expenses.reduce((acc, expense) => {
      const currentCount = acc.get(expense.category) || 0;
      acc.set(expense.category, currentCount + 1);
      return acc;
    }, new Map<string, number>());

    const totalCount = expenses.length;
    const categoryStats = Array.from(categoryMap).map(([category, count]) => {
      const percent = (count / totalCount) * 100;
      return { category, count, percent };
    });

    
    categoryStats.forEach(stat => {
      stat.percent = parseFloat(stat.percent.toFixed(2));
    });

    return categoryStats;
  }
}