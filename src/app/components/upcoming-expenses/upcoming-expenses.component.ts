import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

export interface Expense {
  date: string;
  description: string;
  value: number;
}



@Component({
  selector: 'app-upcoming-expenses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './upcoming-expenses.component.html',
  styleUrl: './upcoming-expenses.component.scss'
})
export class UpcomingExpensesComponent {

  expenses: Expense[] = [
    { date: '27/04/2024', description: 'iPhone 14 Pro',   value: 44.5467 },
    { date: '27/04/2024', description: 'Apple iMac 27"',  value: 25.6982 },
    { date: '27/04/2024', description: 'Apple Watch SE',  value: 20.1869 },
    { date: '27/04/2024', description: 'Apple iPad Air',  value: 10.3967 },
    { date: '27/04/2024', description: 'Apple iMac 24"',  value: 98.543 },
    { date: '27/04/2024', description: 'Apple Iphone 13"',  value: 1500.543 },
  ];
}
