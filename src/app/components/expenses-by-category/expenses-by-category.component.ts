import { Component, OnInit } from '@angular/core';
import { Expense } from '../../types/expense-type';
import { ExpensesService } from '../../services/expenses/expenses.service';
import {  NgApexchartsModule } from 'ng-apexcharts';
import { ExpenseCategory } from '../../types/expense-category';




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
export class ExpensesByCategoryComponent implements OnInit {

  

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


  ngOnInit() {
    this.expensesService.getExpensesList().subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses;
        const groupedData = this.calculateExpenseStats(this.expenses);
        const totalCategories = this.expenses.length;
  
        const categories = groupedData.map(group => group.category.name);
        const seriesData = groupedData.map(group => (group.count / totalCategories) * 100);
        
        this.chartOptions.series = seriesData;
        this.chartOptions.labels = categories;
  
        console.log(groupedData);
        console.log(this.expenses);
      }
    );
  }
  


  calculateExpenseStats(expenses: Expense[]): { category: ExpenseCategory, count: number, percent: number }[] {
    const categoryMap = expenses.reduce((acc, expense) => {
      const currentCount = acc.get(expense.category.name) || 0;
      acc.set(expense.category.name, currentCount + 1);
      return acc;
    }, new Map<string, number>());
  
    const totalCount = expenses.length;
    const categoryStats = Array.from(categoryMap).map(([categoryName, count]) => {
      const percent = (count / totalCount) * 100;
      return { category: { id: '', name: categoryName }, count, percent };
    });
  
    categoryStats.forEach(stat => {
      stat.percent = parseFloat(stat.percent.toFixed(2));
    });
  
    return categoryStats;
  }
  
}