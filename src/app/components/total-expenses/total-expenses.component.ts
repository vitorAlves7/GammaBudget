import { Component } from '@angular/core';






@Component({
  selector: 'app-total-expenses',
  standalone: true,
  imports: [],
  templateUrl: './total-expenses.component.html',
  styleUrl: './total-expenses.component.scss'
})
export class TotalExpensesComponent {
  
  
  totalToPay: number = 1000; 
 
  constructor() { }

  ngOnInit(): void {
    
  }
}


