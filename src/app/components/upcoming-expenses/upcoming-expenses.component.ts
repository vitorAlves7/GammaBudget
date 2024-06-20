import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { Expense } from '../../types/expense-type';

@Component({
  selector: 'app-upcoming-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-expenses.component.html',
  styleUrl: './upcoming-expenses.component.scss'
})
export class UpcomingExpensesComponent implements OnInit {

  //  expenses: Expense[] = [
  //   { id: 1, name: "iPhone 14 Pro", description: "Apple smartphone", amount: 44.5467, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" },
  //   { id: 2, name: "Apple iMac 27", description: "Apple desktop computer", amount: 25.6982, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" },
  //   { id: 3, name: "Apple Watch SE", description: "Apple smartwatch", amount: 20.1869, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" },
  //   { id: 4, name: "Apple iPad Air", description: "Apple tablet", amount: 10.3967, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" },
  //   { id: 5, name: "Apple iMac 24", description: "Apple desktop computer", amount: 98.543, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" },
  //   { id: 6, name: "Apple iPhone 13", description: "Apple smartphone", amount: 1500.543, expiration_date: "27/04/2024", paid: false, payment_date: "", category: "Electronics" }
  // ];

  expenses: Expense[] = [];
  noExpenses: boolean = false;

  constructor(private expensesService: ExpensesService) {}

  
  ngOnInit(): void {
    this.expensesService.getExpensesList().subscribe(
      (data: Expense[]) => {
        this.expenses = this.filterExpenses(data);
        this.noExpenses = this.expenses.length === 0;
      }
    );
  }

  filterExpenses(expenses: Expense[]): Expense[] {
    const today = new Date();
    return expenses.filter(expense => {
      const expirationDate = new Date(expense.expiration_date);      
      return !expense.paid && expirationDate > today;
    });
  }

  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }
  
  


  

}
