import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { Expense } from '../../types/expense-type';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { FormsModule } from '@angular/forms';
import { AlertsService } from '../../services/alerts/alerts.service';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { ExpenseCategoryService } from '../../services/category/expense-category.service';


export interface Alert {
  id: string;
  user_id: number;
  user_email: string;
  revenue_id: string;
  message: string;
  alert_date: string;
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
export class AlertsComponent implements OnInit{

  
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();
  showModal = false;
  selectedExpense: any;
  selectedRadio: any;
  customAlertDate: any;
  showAlert: any;
  alerts: Alert[] =[];
  expenses: Expense[] = [
    {
      id: 1,
      name: 'Conta de luz',
      description: 'Pagamento mensal da conta de luz',
      amount: -150.0,
      expiration_date: '2024-06-30',
      paid: false,
      payment_date: '',
      category: {
        id: '1',
        name: 'Casa',
      },
    },
  ];
  categoriesExpense: any;

  alert_date_temp :any;
  

  addAlert() {
    this.showModal = true;
    console.log(this.expenses);
    
  }

  closeModal() {
    this.showModal = false;
  }

  selectExpense(expense: any) {
    this.selectedExpense = expense;
    console.log( this.selectedExpense)
  }
  confirm() {
    

    if (this.selectedRadio === 'custom') {
      this.alert_date_temp= this.customAlertDate;
    } else if (this.selectedRadio === 'expiration' && this.selectedExpense) {
      this.alert_date_temp = this.selectedExpense.expiration_date;
    }

  
    const alert = {
     
        revenue_id: this.selectedExpense.id,
        message : 'teste',
        alert_date:  this.alert_date_temp
    }
    console.log(alert)

    




    this.addAlertToList(alert)
    console.log('vai pro back no add', alert)


    console.log(this.selectedExpense);
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

  deleteAlert(item: any) {
    console.log('AQUIIII',item);

    this.deleteAlertFromList(item.id);
    const index = this.alerts.indexOf(item);
    if (index > -1) {
      this.alerts.splice(index, 1);
    }
    
   
    
   

    
  }

  constructor( private expenseService: ExpensesService,
     private expenseCategoryService: ExpenseCategoryService, private alertsService: AlertsService
  ) { }

 

  

  ngOnInit(): void {

    this.getData();
   







  }
  getData(){
    this.alertsService.getAlertList()
    .subscribe(response => {

      this.alerts = response;
      console.log(this.alerts);

    });


    this.expenseCategoryService.getList()
      .subscribe(response => {

        this.categoriesExpense = response;
        console.log(this.categoriesExpense);

      });

      this.expenseService.getExpensesList()
      .subscribe(exp => {
        this.expenses = exp;
        console.log(this.expenses);
      });
  }
  getExpenseById(expense_id: any): any {
    return this.expenses.find(expense => expense.id === expense_id);
  }

  addAlertToList(item: any): void {
    this.alertsService.addAlert(item)
      .subscribe(() => {
        this.getData();
      });
  }
  deleteAlertFromList(id: string): void {
    this.alertsService.deleteAlert(id)
      .subscribe(() => {
        this.getData();
      });
  }

  

 
  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;

  }
}
