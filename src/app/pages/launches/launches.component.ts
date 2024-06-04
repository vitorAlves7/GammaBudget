import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ItemFilterPipe } from './item-filter.pipe';
import { OptionFilterPipe } from './option-filter.pipe';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { MonthYearFilterPipe } from "../../components/month-selector/month-year-filter/month-year-filter.pipe";
import { IncomingsService } from '../../services/incomings/incomings.service';
import { HttpClientModule } from '@angular/common/http';
import { ExpensesService } from '../../services/expenses/expenses.service';
import { IncomingCategoryService } from '../../services/category/incoming-category.service';
import { ExpenseCategoryService } from '../../services/category/expense-category.service';



export interface IncomingCategory {
  id: string;
  name: string;
}

export interface ExpenseCategory {
  id: string;
  name: string;
}


export interface Incoming {
  id: string;
  user_id: string;
  name: string;
  description: string;
  amount: number;
  launch_date: string;
  category: IncomingCategory;
}

export interface Expense {
  id?: number;
  name: string;
  description: string;
  amount: number;
  expiration_date: string;
  paid: boolean;
  payment_date: string;
  category: ExpenseCategory;
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

  categoriesExpense : Expense[] =[];

  categoriesIncoming : Incoming[ ] =[];



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
    id: '',
    user_id: '',
    name: '',
    description: '',
    amount: 0,
    launch_date: '',
    category: {
      id: '',
      name: '',
    }
  };

  expense: Expense = {
    name: '',
    description: '',
    amount: 0,
    expiration_date: '',
    paid: false,
    payment_date: '',
    category: {
      id: '',
      name: '',
    }
  }





  filterText: string = '';
  selectedFilterOption: string = '';

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  actualIncomingDate = new Date().toISOString().split('T')[0];






  openModal(item: any) {

    this.selectedItem = item;
    console.log('selecionei', this.selectedItem)

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
    console.log('ITEM SELECIONADO')

    console.log(this.selectedItem)

    if (this.selectedItem.amount < 0) {
      this.selectedItem.amount = Math.abs(this.selectedItem.amount);
    }

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
    console.log(this.itemType)
    if (this.itemType == 'expense') {

      Object.assign(this.selectedItem, this.editItem);

      console.log(this.selectedItem)

      this.selectedItem = this.selectedItem as Expense;
      console.log(this.selectedItem)
      console.log(typeof (this.selectedItem))

      // this.updateExpenseItem(this.selectedItem.id, this.selectedItem);



      const expenseWithStringValue = {


        name: this.selectedItem.name,
        description: this.selectedItem.description,
        amount: this.selectedItem.amount,
        expiration_date: this.selectedItem.expiration_date,
        paid: this.selectedItem.paid.toString(),
        payment_date: this.selectedItem.payment_date,
        category: this.selectedItem.category.id
      }

      this.updateExpenseItem(this.selectedItem.id, expenseWithStringValue);

      console.log('vai pro back', expenseWithStringValue)

    } else {
      console.log(this.selectedItem);


      Object.assign(this.selectedItem, this.editItem);

      const incomingFormatted = {
        name: this.selectedItem.name,
        description: this.selectedItem.description,
        amount: this.selectedItem.amount,
        category: this.selectedItem.category.id
      }

      this.updateIncomingListItem(this.selectedItem.id, incomingFormatted);


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
      this.deleteIncomingListItem(this.selectedItem.id);

    } else {
      this.deleteExpenseItem(this.selectedItem.id);


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
        id: '',
        user_id: '',
        name: '',
        description: '',
        amount: 0,
        launch_date: '',
        category: {
          id: '',
          name: '',
        }
      };

      this.expense = {
        name: '',
        amount: 0,
        expiration_date: '',
        paid: false,
        payment_date: '',
        description: '',
        category: {
          id: '',
          name: '',
        }
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

    console.log(this.expense.expiration_date)
    if (this.itemType === 'expense') {

      console.log()
      this.items.push({ ...this.expense });




      const expenseWithStringValue = {


        name: this.expense.name,
        description: this.expense.description,
        amount: this.expense.amount,
        expiration_date: this.expense.expiration_date,
        paid: this.expense.paid.toString(),
        payment_date: this.expense.payment_date,
        category: this.expense.category.id,


      }




      this.addItemToExpenses(expenseWithStringValue)
      console.log('vai pro back no add', expenseWithStringValue)
    }
    else {
      this.items.push({ ...this.incoming });

      const incomingWithoutDate = {
        name: this.incoming.name,
        description: this.incoming.name,
        amount: this.incoming.amount,
        category: this.incoming.category.id
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

  constructor(private incomingService: IncomingsService, private expenseService: ExpensesService,
    private incomingCategoryService: IncomingCategoryService, private expenseCategoryService: ExpenseCategoryService
  ) { }

  getData(): void {

    this.incomingCategoryService.getList()
      .subscribe(response => {

        this.categoriesIncoming = response;
        console.log(this.categoriesIncoming);

      });

    this.expenseCategoryService.getList()
      .subscribe(response => {

        this.categoriesExpense = response;
        console.log(this.categoriesExpense);

      });




    this.incomingService.getIncomingList()
      .subscribe(response => {
        console.log('minha lista de receitas', response);
        this.incomingList = response;

        this.incomingList.forEach(item => {
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
          // item.payment_date = item.payment_date.slice(0, 10); 
          //  console.log('expiration date', item.expiration_date);
          //  console.log('payment date', item.payment_date);
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
    this.expenseService.updateExpenseItem(id, item)
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


