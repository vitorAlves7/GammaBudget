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
  incomings: Incoming[] = [];
  expenses: Expense[] = [];
  totalMonthIncome: number = 0;
  totalMonthExpense: number = 0;
  dayPeriod: string | undefined;
  balance: number = 0;
  
  constructor(private incomingsService: IncomingsService, private expensesService: ExpensesService) {}
  
  ngOnInit(): void {
    this.dayPeriod = this.verifyDayPeriod();
    this.loadMonthSummary();
  }
  
  calculateBalance(incomings: Incoming[], expenses: Expense[]): number {
   
    const currentDate = new Date(); 
  

    let totalIncomings = incomings
      .filter(incoming => new Date(incoming.launch_date) <= currentDate) 
      .reduce((total, incoming) => total + incoming.amount, 0);
  
    
    let totalExpenses = expenses
      .filter(expense => expense.paid) 
      .reduce((total, expense) => total + Math.abs(expense.amount), 0);
  
  
    return totalIncomings - totalExpenses;
  }
  
  
  loadMonthSummary() {
    this.incomingsService.getIncomings().subscribe(
      (incomings: Incoming[]) => {
        this.incomings = incomings; 
        this.totalMonthIncome = this.calculateCurrentMonthIncome(incomings);
        this.updateBalance();
      }
    );
  
    this.expensesService.getExpenses().subscribe(
      (expenses: Expense[]) => {
        this.expenses = expenses; 
        this.totalMonthExpense = this.calculateCurrentMonthExpense(expenses);
        this.updateBalance(); 
      }
    );
  }
  
  updateBalance() {
    if (this.incomings.length > 0 && this.expenses.length > 0) {
      this.balance = this.calculateBalance(this.incomings, this.expenses);
      console.log(this.incomings);
      console.log(this.expenses);
    }
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
