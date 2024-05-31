import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemFilterPipe } from './item-filter.pipe';
import { OptionFilterPipe } from './option-filter.pipe';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { MonthYearFilterPipe } from "../../components/month-selector/month-year-filter/month-year-filter.pipe";
import { ApiService } from '../../services/api-service.service';
import { HttpClientModule } from '@angular/common/http';







interface Incoming {
  id?: number;
  name: string;
  description: string;
  amount: number;
  launch_date: string;
  category: string;
}

interface Expense {
  id?: number;
  name: string;
  description: string;
  amount: number;
  expiration_date: string;
  paid: boolean;
  payment_date: string;
  category: string;
}



@Component({
  selector: 'app-launches',
  standalone: true,
  templateUrl: './launches.component.html',
  styleUrl: './launches.component.scss',
  imports:
    [
      NavbarComponent,
      CommonModule,
      FormsModule,
      RouterModule,
      ItemFilterPipe,
      OptionFilterPipe,
      MonthSelectorComponent,
      MonthYearFilterPipe,
      HttpClientModule,
      
    ]
})
export class LaunchesComponent {
  showModal = false;
  showEditModal = false;
  showAddModal = false;
  selectedItem: any;
  editItem: any;
  itemType: string | undefined;
  saldoPrevisto = 0;

  items: any[]=[];
  incomingList: Incoming[] = [];
  expenses: Expense[] = [];

  incoming: Incoming = {
    name: '',
    description: '',
    amount: 0,
    launch_date: '',
    category: '',
  };

  expense: Expense = {
    name: '',
    description: '',
    amount: 0,
    expiration_date: '',
    paid: false,
    payment_date: '',
    category: '',
  }





  filterText: string = '';
  selectedFilterOption: string = '';

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

 
  openModal(item: any) {

    this.selectedItem = item;
    console.log(this.selectedItem)

    if (this.selectedItem.amount > 0) {
      this.itemType = 'incoming'
    } else {
      this.itemType = 'expense'
    }
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  openEditModal() {
    this.editItem = { ...this.selectedItem };
    this.showEditModal = true;
    this.showModal = false;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  saveChanges() {
    this.closeModal();
  }

  updateItem() {
    
    if (this.selectedItem.amount < 0) {
      this.editItem.amount = -Math.abs(this.editItem.amount);
      Object.assign(this.selectedItem, this.editItem);
      this.updateExpenseItem(this.selectedItem.id, this.selectedItem);
      
    }else{
      Object.assign(this.selectedItem, this.editItem);
      this.updateIncomingListItem(this.selectedItem.id, this.selectedItem);

    }

    Object.assign(this.selectedItem, this.editItem);
    
    this.calculateSaldoPrevisto();
    this.closeEditModal();
    console.log(this.selectedItem.id)
  }

  deleteItem() {
    const index = this.items.indexOf(this.selectedItem);
    if (index > -1) {
      this.items.splice(index, 1);
    }
    console.log('Estou no delete');
    console.log(this.selectedItem.id);
    if(this.selectedItem.amount > 0){
      this.deleteIncomingListItem(this.selectedItem.id);
    }else{
      this.deleteExpenseItem(this.selectedItem.id);
    }
    
    this.calculateSaldoPrevisto();
    this.closeModal();
  }

  deleteAllItems() {
    this.items = [];
    
    this.calculateSaldoPrevisto();
  }

  openAddModal(type: string) {

    this.resetInputs(type)

    this.itemType = type;
    this.calculateSaldoPrevisto();
    this.showAddModal = true;

  }

  resetInputs(type:string){
     {
      this.incoming = {
        name: '',
        description: '',
        amount: 0,
        launch_date: '',
        category: '',
      };
  
      this.expense = {
        name: '',
        amount: 0,
        expiration_date: '',
        paid: false,
        payment_date: '',
        category: '',
        description: '',
      }
    }
  }

  closeAddModal() {
    this.showAddModal = false;
  }

  addItem() {
    console.log(this.itemType)
    if (this.itemType === 'expense') {
      this.expense.amount = -Math.abs(this.expense.amount);
      console.log()
      this.items.push({ ...this.expense });
      this.addItemToExpenses(this.expense)
    }
    else {
      this.items.push({ ...this.incoming });
      this.addItemToIncomingList(this.incoming)
    }


    this.calculateSaldoPrevisto();
    this.closeAddModal();
    console.log(this.items)

  }
  private calculateSaldoPrevisto() {
    this.saldoPrevisto = 0;
  

    const filteredIncomings = this.items.filter(item => {
      if ('launch_date' in item) {
        const itemDate = new Date(item.launch_date);
        const isSameYear = itemDate.getFullYear() === this.selectedYear;
        const isSameMonth = itemDate.getMonth()  === this.selectedMonth;
        return isSameYear && isSameMonth;
      }
      return false;
    }) as Incoming[];

    console.log(filteredIncomings)
    console.log(this.selectedYear)
    console.log(this.selectedMonth)
  
    
    const saldoPrevistoReceitas = filteredIncomings.reduce((saldo, incoming) => saldo + incoming.amount, 0);
  
    const filteredExpenses = this.items.filter(item => {
      if ('expiration_date' in item && item.paid) {
        const itemDate = new Date(item.expiration_date + 'T00:00:00');
        const isSameYear = itemDate.getFullYear() === this.selectedYear ;
        const isSameMonth = itemDate.getMonth()  === this.selectedMonth;
        return isSameYear && isSameMonth;
      }
      return false;
    }) as Expense[];

    console.log(filteredExpenses)
  
   
    const saldoPrevistoDespesas = filteredExpenses.reduce((saldo, expense) => saldo + expense.amount, 0);
  
    
    this.saldoPrevisto = saldoPrevistoReceitas + saldoPrevistoDespesas;
  
    console.log('Saldo Previsto:', this.saldoPrevisto);
  }
  ngOnInit(): void {
    this.getData(); 
  }
  
  constructor(private apiService: ApiService) {}
  
  getData() {
    this.apiService.getData('incomings')
      .subscribe(response => {
        this.incomingList = response;
        this.combineLists();
      });

    this.apiService.getData('expenses')
      .subscribe(response => {
        this.expenses = response;
        this.combineLists();
      });
  }
  
  combineLists(): void {
    if (this.incomingList && this.expenses) { 
      this.items = [...this.incomingList, ...this.expenses];
      this.calculateSaldoPrevisto(); 
    }
  }
  
  
  addItemToIncomingList(item: any): void {
    this.apiService.postData('incomings', item).subscribe(response => {
      console.log('API response:', response);  // Logando a resposta da API
      this.getData(); 
    });
  }
  

  updateIncomingListItem(id: number, item: any): void {
    this.apiService.updateData('incomings', id, item).subscribe(() => {
      this.getData(); 
    });
  }

  deleteIncomingListItem(id: number): void {
    this.apiService.deleteData('incomings', id).subscribe(() => {
      this.getData();
    });
  }

  addItemToExpenses(item: any): void {
    this.apiService.postData('expenses', item).subscribe(() => {
      this.getData(); 
    });
  }

  updateExpenseItem(id: number, item: any): void {
    this.apiService.updateData('expenses', id, item).subscribe(() => {
      this.getData(); 
    });
  }

  deleteExpenseItem(id: number): void {
    this.apiService.deleteData('expenses', id).subscribe(() => {
      this.getData(); 
    });
  }

  onMonthYearChanged(event: { month: number, year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.calculateSaldoPrevisto();
  }



}
