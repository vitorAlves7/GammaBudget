import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemFilterPipe } from './item-filter.pipe';
import { OptionFilterPipe } from './option-filter.pipe';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { MonthYearFilterPipe } from "../../components/month-selector/month-year-filter/month-year-filter.pipe";
import { IncomingService } from '../../services/incoming-service';
import { HttpClientModule } from '@angular/common/http';
import { ExpenseService } from '../../services/expense.service';






export interface Incoming {
  id?: number;
  name: string;
  description: string;
  amount: number;
  launch_date: string;
  category: string;
}

export interface Expense {
  id?: number;
  name: string;
  description: string;
  amount: number;
  expiration_date: string;
  paid: boolean | string;
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

  items: any[] = [];
  incomingList: Incoming[] = [];
  expenses: Expense[] = [];

  incoming: Incoming = {
    name: '',
    description: '',
    amount: 0,
    launch_date: '',
    category: ''
  };

  expense: Expense = {
    name: '',
    description: '',
    amount: 0,
    expiration_date: '',
    paid: false,
    payment_date: '',
    category: ''
  }





  filterText: string = '';
  selectedFilterOption: string = '';

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  actualIncomingDate = new Date().toISOString().split('T')[0];
 



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
    console.log(this.selectedItem.id)
    if (this.selectedItem.amount < 0) {
      
      Object.assign(this.selectedItem, this.editItem);
      
      console.log(this.selectedItem)
      // this.updateExpenseItem(this.selectedItem.id, this.selectedItem);

      this.selectedItem.category= '54065527-5cc3-4f61-b40b-133bd401b924';
      this.selectedItem.paid = this.selectedItem.paid.toString();
      this.updateExpenseItem('b85e15fc-62b2-4388-862c-1269225ad132', JSON.stringify(this.selectedItem));
 
     

    } else {
      console.log(this.selectedItem);
      Object.assign(this.selectedItem, this.editItem);
      this.selectedItem.category= 'd7f613d1-aaf0-43ea-802a-bd0da411453b';
      this.updateIncomingListItem('05b4dbc7-c4ca-4893-8e5e-1ebb65b9e0ab', JSON.stringify(this.selectedItem));
    
      
    }

    Object.assign(this.selectedItem, this.editItem);

    this.calculateBalance();
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
    if (this.selectedItem.amount > 0) {
      // this.deleteIncomingListItem(this.selectedItem.id);
      this.deleteIncomingListItem('91726b75-f1a9-43ef-aa59-10d2926ede3e');
    } else {
      // this.deleteExpenseItem(this.selectedItem.id);
      this.deleteExpenseItem('cae9a596-794a-40dc-bbb4-5acf0bf4df59');
      
    }

    this.calculateBalance();
    this.closeModal();
  }


  openAddModal(type: string) {

    this.resetInputs(type)

    this.itemType = type;
    this.calculateBalance();
    this.showAddModal = true;

  }

  resetInputs(type: string) {
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
  getAbsoluteValue(value: number): number {
    return Math.abs(value);
  }


  addItem() {
    console.log(this.itemType)
    console.log('aqui')
    console.log(this.expense.expiration_date)
    if (this.itemType === 'expense') {
    
      console.log()
      this.items.push({ ...this.expense });

     
      this.expense.category = '34777ffc-2613-4f82-a78d-abfbdc6398fb';
      this.expense.paid = this.expense.paid.toString();
      this.addItemToExpenses(this.expense)
      console.log(this.expense)
    }
    else {
      this.items.push({ ...this.incoming });

      const incomingWithoutDate = {
        name: this.incoming.name,
        description: this.incoming.name,
        amount: this.incoming.amount,
        category: '076ad57c-f848-438c-9940-2524cc390a5d'
      };

      console.log(incomingWithoutDate)



      this.addItemToIncomingList(incomingWithoutDate)
    }


    this.calculateBalance();
    this.closeAddModal();
    console.log(this.items)

  }
  private calculateBalance() {
    this.saldoPrevisto = 0;


    const filteredIncomings = this.items.filter(item => {
      if ('launch_date' in item) {
        const itemDate = new Date(item.launch_date);
        const isSameYear = itemDate.getFullYear() === this.selectedYear;
        const isSameMonth = itemDate.getMonth() === this.selectedMonth;
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
        const isSameYear = itemDate.getFullYear() === this.selectedYear;
        const isSameMonth = itemDate.getMonth() === this.selectedMonth;
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

  constructor(private incomingService: IncomingService, private expenseService: ExpenseService) { }

  getData(): void {
    this.incomingService.getIncomingList()
      .subscribe(response => {
        console.log(response);
        this.incomingList = response;

        this.incomingList .forEach(item => {
           console.log((item.launch_date))
          
        });

        this.incomingList.forEach(item => {
          item.launch_date = item.launch_date.slice(0, 10); 
           console.log((item.launch_date))
        });

        

        this.combineLists();
      });

    this.expenseService.getExpensesList()
      .subscribe(exp => {
        console.log(exp);
        this.expenses = exp;
        this.expenses.forEach(item => {
          item.amount = -item.amount;
        });

        this.expenses.forEach(item => {
          item.expiration_date = item.expiration_date.slice(0, 10); 
           console.log((item.expiration_date))
        });
        this.combineLists();
      });
  }

  

  combineLists(): void {
    if (this.incomingList && this.expenses) {
      this.items = [...this.incomingList, ...this.expenses];
      this.calculateBalance();
    }
  }

  addItemToIncomingList(item: any): void {
    this.incomingService.addItemToIncomingList(item)
      .subscribe(() => {
        this.getData();
      });
  }

  updateIncomingListItem(id: string, item: any): void {
    this.incomingService.updateIncomingListItem(id, item)
      .subscribe(() => {
        this.getData();
      });
  }

  deleteIncomingListItem(id: string): void {
    this.incomingService.deleteIncomingListItem(id)
      .subscribe(() => {
        this.getData();
      });
  }

  addItemToExpenses(item: any): void {
    this.expenseService.addItemToExpenses(item)
      .subscribe(() => {
        this.getData();
      });
  }

  updateExpenseItem(id: string, item: any): void {
    this.expenseService.updateExpenseItem( id, item)
      .subscribe(() => {
        this.getData();
      });
  }

  deleteExpenseItem(id: string): void {
    this.expenseService.deleteExpenseItem(id)
      .subscribe(() => {
        this.getData();
      });
  }

  onMonthYearChanged(event: { month: number, year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.calculateBalance();
  }



}


