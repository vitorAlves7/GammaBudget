import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Incoming } from '../../types/incoming-type';
import { Expense } from '../../types/expense-type';
import { IncomingsService } from '../../services/incomings/incomings.service';
import { ExpensesService } from '../../services/expenses/expenses.service';

@Component({
  selector: 'app-general-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './general-information.component.html',
  styleUrl: './general-information.component.scss'
})
export class GeneralInformationComponent {

  totalMonthIncome: number = 0;
  totalMonthExpense: number = 0;
  dayPeriod: string | undefined;
  
  constructor(private incomingsService: IncomingsService, private expensesService: ExpensesService) {}

  ngOnInit(): void {
    this.dayPeriod = this.verifyDayPeriod();
    this.loadMonthSummary();
  }



  loadMonthSummary() {
    
    this.incomingsService.getIncomings().subscribe(
      (incomings: Incoming[]) => {
        this.totalMonthIncome = this.calculateCurrentMonthIncome(incomings);
      }
      
    );

    
    this.expensesService.getExpenses().subscribe(
      (expenses: Expense[]) => {
        this.totalMonthExpense = this.calculateCurrentMonthExpense(expenses);
      }
    );
  }
  
  calculateCurrentMonthIncome(incomings: Incoming[]): number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    
    let totalIncome = 0;
    incomings.forEach(incoming => {
      const incomingDate = new Date(incoming.launch_date);
      const month = incomingDate.getMonth();
      const year = incomingDate.getFullYear();
  
      if (month === currentMonth && year === currentYear) {
        totalIncome += incoming.amount;
      }
    });
    return totalIncome;
  }
  
  calculateCurrentMonthExpense(expenses: Expense[]): number {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth(); 
    const currentYear = currentDate.getFullYear();
    
    let totalExpense = 0;
    expenses.forEach(expense => {
      const expenseDate = new Date(expense.expiration_date);
      const month = expenseDate.getMonth();
      const year = expenseDate.getFullYear();
  
      if (month === currentMonth && year === currentYear) {
        totalExpense += Math.abs(expense.amount);
      }
    });
    return totalExpense;
   }

  verifyDayPeriod(): string {
    
    let hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Bom dia";
    } else if (hour >= 12 && hour < 18) {
      return "Boa Tarde";
    } else {
      return "Boa noite";
    }
  }

}
