import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { Expense } from '../../types/expense-type';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { FormsModule } from '@angular/forms';
import { ExpenseCategory } from '../../types/expense-category';

export interface Expense2 {
  id?: number;
  name: string;
  description: string;
  amount: number;
  expiration_date: string;
  paid: boolean;
  payment_date: string;
  alert: boolean;
  alert_date: string;
  category: ExpenseCategory;
}

@Component({
  selector: 'app-alerts',
  standalone: true,
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.scss',
  imports: [
    NavbarComponent,
    CommonModule,
    MonthSelectorComponent,
    MonthYearFilterPipe,
    FormsModule,
  ],
})
export class AlertsComponent {


  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  showModal = false;
  selectedExpense: any;
  selectedRadio: any;
  customAlertDate: any;
  showAlert: any;
  filtedExpenses: Expense2[] = [];
  expenses: Expense2[] = [
    {
      id: 1,
      name: 'Conta de luz',
      description: 'Pagamento mensal da conta de luz',
      amount: -150.0,
      expiration_date: '2024-06-30',
      paid: false,
      payment_date: '',
      alert: false,
      alert_date: '',
      category: {
        id: '1',
        name: 'Casa',
      },
    },
  ];

  addAlert() {
    this.showModal = true;
    console.log(this.expenses);
  }

  closeModal() {
    this.showModal = false;
  }

  selectExpense(expense: any) {
    this.selectedExpense = expense;
    
  }
  confirm() {
    let alertDate;
    this.selectedExpense.alert = true;

    if (this.selectedRadio === 'custom') {
      this.selectedExpense.alert_date = this.customAlertDate;
    } else if (this.selectedRadio === 'expiration' && this.selectedExpense) {
      this.selectedExpense.alert_date = this.selectedExpense.expiration_date;
    }
    this.filtedExpenses.push({ ...this.selectedExpense });
    console.log(this.selectedExpense);
    console.log('Data do alerta:', alertDate);
    this.closeModal();
    this.showSucessAlert();
  }

  onRadioChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.selectedRadio = inputElement.value;
  }


  showSucessAlert() {
    console.log('Entrando em showSucessAlert...');
    this.showAlert = true;
    console.log('Mostrar alerta de sucesso:', this.showAlert);
    setTimeout(() => {
      this.showAlert = false;
      console.log('Ocultar alerta de sucesso:', this.showAlert);
    }, 3000);
  }


 

  

  ngOnInit(): void {
    this.filtedExpenses = this.expenses.filter((e) => e.alert);
  }

  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
  }
}
