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

    categoriesExpense = [
    { id: '3e24dc14-31dc-418d-89f2-e95bc3540dc0', name: 'Alimentação', description: 'Categoria de despesa de Alimentação' },
    { id: '9f65323e-ee7a-4e30-b52e-9ac2a1dcff09', name: 'Assinaturas e serviços', description: 'Categoria de despesa de Assinaturas e serviços' },
    { id: '05c09266-f80e-43ee-9a61-11ebdff72f52', name: 'Casa', description: 'Categoria de despesa de Casa' },
    { id: '0660dca7-62a4-4e35-acf7-215e529ca47d', name: 'Compras', description: 'Categoria de despesa de Compras' },
    { id: '7831c434-e431-477c-b74d-82410bb151a4', name: 'Cuidados pessoais', description: 'Categoria de despesa de Cuidados pessoais' },
    { id: '8849fd7e-3e89-4f0c-8c10-f4e9d9bebbf2', name: 'Dívidas e empréstimos', description: 'Categoria de despesa de Dívidas e empréstimos' },
    { id: 'f16bd087-74b4-40cb-af82-f3dcd93160a8', name: 'Educação', description: 'Categoria de despesa de Educação' },
    { id: 'd9368a6b-b366-417b-b4b2-1e39fde16a5c', name: 'Família', description: 'Categoria de despesa de Família' },
    { id: 'e8f5165a-c6f6-4ba3-828e-721427936175', name: 'Impostos', description: 'Categoria de despesa de Impostos' },
    { id: '15adcd43-7ee3-4b1f-ac8d-97c238263fc6', name: 'Investimentos', description: 'Categoria de despesa de Investimentos' },
    { id: '6b13a47e-01d3-470d-8bbc-cd3706a144ba', name: 'Lazer', description: 'Categoria de despesa de Lazer' },
    { id: '8468ca25-73c9-4855-bb55-e43847928a27', name: 'Mercado', description: 'Categoria de despesa de Mercado' },
    { id: '2bf57692-a8a9-487d-bdf3-254445b37ab8', name: 'Outros', description: 'Categoria de despesa de Outros' },
    { id: '499eb89e-5d2e-415e-8e23-ec94bf81c00d', name: 'Pets', description: 'Categoria de despesa de Pets' },
    { id: 'ec4d7d22-43f7-43cd-b9f9-1a39c7a910ac', name: 'Presentes', description: 'Categoria de despesa de Presentes' },
    { id: '14730cd0-e93b-44a3-b879-fc70cce1d055', name: 'Restaurantes', description: 'Categoria de despesa de Restaurantes' },
    { id: '1a7e756d-099a-4059-b58b-30037a2fff3f', name: 'Saúde', description: 'Categoria de despesa de Saúde' },
    { id: 'f36e53f0-8aa4-417b-94ee-69f68af76f65', name: 'Transporte', description: 'Categoria de despesa de Transporte' },
    { id: '51bbad1b-edec-419e-88f6-0cfe5f4afcef', name: 'Viagem', description: 'Categoria de despesa de Viagem' }
  ];
  
    categoriesIncoming = [
    { id: 'f59b169f-b11c-4c30-8d42-1adcd2454cfe', name: 'Investimento', description: 'Receita referente a investimentos' },
    { id: '425afa01-d592-4d41-b78f-dfb4240af448', name: 'Outros', description: 'Outros tipos de receita' },
    { id: 'a2839acb-6b26-4b64-9af3-031474a24178', name: 'Salário', description: 'Receita referente ao salário' }
  ];
  


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

    if(this.selectedItem.amount<0){
      this.selectedItem.amount= Math.abs(this.selectedItem.amount);
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
      console.log(typeof(this.selectedItem))

      // this.updateExpenseItem(this.selectedItem.id, this.selectedItem);

 

      const expenseWithStringValue = {

        
        name: this.selectedItem.name,
        description:  this.selectedItem.description,
        amount:  this.selectedItem.amount,
        expiration_date:  this.selectedItem.expiration_date,
        paid:   this.selectedItem.paid.toString(),
        payment_date: this.selectedItem.payment_date,
        category: this.selectedItem.category.id
      }

      this.updateExpenseItem(this.selectedItem.id, expenseWithStringValue);
 
      console.log('vai pro back',expenseWithStringValue)

    } else {
      console.log(this.selectedItem);


      Object.assign(this.selectedItem, this.editItem);

      const incomingFormatted = {
        name: this.selectedItem.name,
        description:  this.selectedItem.description,
        amount:  this.selectedItem.amount,
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
        description:  this.expense.description,
        amount:  this.expense.amount,
        expiration_date:  this.expense.expiration_date,
        paid:   this.expense.paid.toString(),
        payment_date: this.expense.payment_date,
        category: this.expense.category.id,
       

      }




      this.addItemToExpenses(expenseWithStringValue)
      console.log('vai pro back no add',expenseWithStringValue)
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

  constructor(private incomingService: IncomingService, private expenseService: ExpenseService) { }

  getData(): void {
    this.incomingService.getIncomingList()
      .subscribe(response => {
        console.log('minha lista de receitas',response);
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


