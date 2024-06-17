import { Component } from '@angular/core';
import { ExpenseCategory } from '../../types/expense-category';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { ExpenseLimitBarComponent } from '../../components/expense-limit-bar/expense-limit-bar.component';

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

export interface Limit {
  year: string;
  month: string;
  limit: any[];
  expenses: Expense2[];
}

@Component({
  selector: 'app-limit',
  standalone: true,
  templateUrl: './limit.component.html',
  styleUrl: './limit.component.scss',
  imports: [
    MonthSelectorComponent,
    NavbarComponent,
    FormsModule,
    CommonModule,
    MonthYearFilterPipe,
    ExpenseLimitBarComponent,
  ],
})
export class LimitComponent {
  selectedCategoryLimit: any;
  items: any;
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  
  showModal: any;

  categoriesLimited = [
    { label: 'Alimentação', value: 0, max: 0 },
    { label: 'Assinaturas e serviços', value: 0, max: 0 },
    { label: 'Casa', value: 0, max: 0 },
    { label: 'Compras', value: 0, max: 0 },
    { label: 'Cuidados pessoais', value: 0, max: 0 },
    { label: 'Dívidas e empréstimos', value: 0, max: 0 },
    { label: 'Educação', value: 0, max: 0 },
    { label: 'Família', value: 0, max: 0 },
    { label: 'Impostos', value: 0, max: 0 },
    { label: 'Investimentos', value: 0, max: 0 },
    { label: 'Lazer', value: 0, max: 0 },
    { label: 'Mercado', value: 0, max: 0 },
    { label: 'Pets', value: 0, max: 0 },
    { label: 'Presentes', value: 0, max: 0 },
    { label: 'Restaurantes', value: 0, max: 0 },
    { label: 'Saúde', value: 0, max: 0 },
    { label: 'Transporte', value: 0, max: 0 },
    { label: 'Viagem', value: 0, max: 0 },
    { label: 'Outros', value: 0, max: 0 },
  ];
  limit: any;

  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
  }

  addLimit() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  confirm() {
    console.log('Data do alerta:', this.selectedCategoryLimit);
    this.closeModal();
  }

  ngOnInit(): void {
    console.log(this.selectedMonth, this.selectedYear);
  }
}
