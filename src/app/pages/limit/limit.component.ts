import { Component, OnInit } from '@angular/core';
import { ExpenseCategory } from '../../types/expense-category';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { ExpenseLimitBarComponent } from '../../components/expense-limit-bar/expense-limit-bar.component';
import { LimitService } from '../../services/limits/limit.service';
import { ExpenseCategoryService } from '../../services/category/expense-category.service';
import { ExpensesService } from '../../services/expenses/expenses.service';

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


interface CategoryLimited {
  amount: number;
  category: string;
  id?: string;
  limit: number;
  limit_date: string;
  user_id?: number;
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
    ReactiveFormsModule,
  ],
})
export class LimitComponent implements OnInit {
  expenseCategories: ExpenseCategory[] = [];

  expenses: Expense2[] = [];
  selectedCategoryLimit: any;

  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  showModal: any;

  limitAmount: any;
  categoriesLimited: CategoryLimited[] = [];
  showSelectedCategoryLimitModal: boolean | undefined;

  expensesCategoryLimited: any;
  categorySelected: any;
  newLimit: any;
  editLimit: boolean = false;
  limitForm: FormGroup;
  limit_date: string = '';


  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.limit_date = `${this.selectedYear}-${(this.selectedMonth+1).toString().padStart(2, '0')}-${'10'}`;
  }

  addLimit() {
    this.limit_date = `${this.selectedYear}-${(this.selectedMonth+1).toString().padStart(2, '0')}-${'10'}`;

    this.showModal = true;
    console.log(this.limit_date)

  }

  closeModal() {
    this.showModal = false;
  }

  constructor(private fb: FormBuilder, private limitService: LimitService, private expenseCategoryService: ExpenseCategoryService, private expenseService: ExpensesService) {
    this.limitForm = this.fb.group({
      category: [null, Validators.required],
      limitAmount: [null, [Validators.required, Validators.min(0.01)]],
    });

    this.limitForm.get('category')?.valueChanges.subscribe((value) => {
      this.selectedCategoryLimit = value;
    });

    this.limitForm.get('limitAmount')?.valueChanges.subscribe((value) => {
      this.limitAmount = value;
    });
  }

  validateAndSubmit() {
    if (this.limitForm.valid) {
      this.confirm();
    } else {
      this.limitForm.markAllAsTouched();
    }
  }

  confirm() {
    console.log(this.selectedCategoryLimit);
    console.log(this.limitAmount);
    console.log(this.limit_date)
    console.log('data atual AAAAAA ',this.limit_date)
    this.closeModal();

    const categoryName = this.getNameCategoryById(this.selectedCategoryLimit);
    const selectedYearStr = String(this.selectedYear);
    const selectedMonthStr = String(this.selectedMonth + 1).padStart(2, '0');

    const existingCategoryLimit = this.categoriesLimited.find((item) => {
        const itemYear = item.limit_date.substring(0, 4);
        const itemMonth = item.limit_date.substring(5, 7);


        return item.category === categoryName &&
               itemYear === selectedYearStr &&
               itemMonth === selectedMonthStr;
    });

    if (!existingCategoryLimit) {
      this.createLimitCategoryBar(
        categoryName,
        this.limitAmount,
        this.limit_date
      );
    } else {
      console.log('Categoria ja existe no mes e ano');
    }
}



  createLimitCategoryBar(selectedCategoryLimit: any, limit: any, limit_date: string) {

    const categorieLimited :  CategoryLimited = {
      category: selectedCategoryLimit,
      amount: this.calculateValueCategory(this.getNameCategoryById(this.selectedCategoryLimit)),
      limit: limit,
      limit_date: limit_date
    };
    
   
    this.categoriesLimited.push(categorieLimited);
    console.log('vai pro label',this.categoriesLimited);

    const categorieLimitedWithID  = {
      category: this.selectedCategoryLimit,
      amount: this.calculateValueCategory(this.getNameCategoryById(this.selectedCategoryLimit)),
      limit: limit,
      limit_date: limit_date
    };

    
    this.createLimit(categorieLimitedWithID);
    console.log('vai pro back o limite id', categorieLimitedWithID)

  }


  calculateValueCategory(category: string) {
    const filteredExpenses = this.expenses.filter((item) => {
      const [year, month] = item.expiration_date.split('-');

      console.log(year);
      console.log(month);

      const isSameYear = Number(year) === this.selectedYear;
      const isSameMonth = Number(month) === this.selectedMonth + 1;
      const isSameCategory = category == item.category.name;
      return isSameYear && isSameMonth && isSameCategory;
    });

    console.log(filteredExpenses);

    const totalExpenseCategory = filteredExpenses.reduce(
      (total, expense) => total + expense.amount,
      0
    );
    console.log(totalExpenseCategory);
    return totalExpenseCategory;
  }

  getNameCategoryById(id: string) {
    const category = this.expenseCategories.find(
      (category) => category.id === id
    );
    return category ? category.name : '';
  }
  closeCategoryLimitModal() {
    this.showSelectedCategoryLimitModal = false;
  }

  openCategoryLimitModal(category: any) {
    this.categorySelected = category;
    console.log('selecionei a categoria limitada', category);
    this.showSelectedCategoryLimitModal = true;
    this.expensesCategoryLimited = this.getListClickedCategoryLimited(category);
  }
  getListClickedCategoryLimited(category: any) {
    const filteredExpenses = this.expenses.filter((item) => {
      const [year, month] = item.expiration_date.split('-');

      console.log('lista de despesas que filtradas',year);
      console.log('lista de despesas que filtradas',month);

      const isSameYear = Number(year) === this.selectedYear;
      const isSameMonth = Number(month) === this.selectedMonth + 1;
      console.log(category.category)
      console.log(item.category.name)
      const isSameCategory = category.category == item.category.name;
      return isSameYear && isSameMonth && isSameCategory;
    });

    console.log(
      'filtrei as categorias do ano ',
      this.selectedYear,
      'e do mes ',
      this.selectedMonth,
      ':\n',
      filteredExpenses
    );
    return filteredExpenses;
  }

  editMaxlimit() {
    this.editLimit = true;
    this.newLimit = this.categorySelected.limit;
  }
  saveNewLimit() {
    this.categorySelected.limit = this.newLimit;
    this.categoriesLimited.map((item) =>
      item.id === this.categorySelected.id
        ? { ...item, ...{ limit: this.categorySelected.limit } }
        : item
    );
    console.log(this.categorySelected)
   

    this.updateLimitListItem(this.categorySelected.id, this.categorySelected);


    console.log(this.categoriesLimited);
    this.editLimit = false;
    this.closeCategoryLimitModal();
  }
  deleteCategoryLimited() {
    this.deleteLimitListItem(this.categorySelected.id);


    this.categoriesLimited = this.categoriesLimited.filter(
      (item) => item.id !== this.categorySelected.id
    );
    console.log(this.categoriesLimited);
    this.showSelectedCategoryLimitModal = false;
  }

  ngOnInit(): void {
    console.log('selecionei o mes e o ano atua: ', this.selectedMonth, this.selectedYear);
    console.log('quero a data do limite ')

    this.limit_date = `${this.selectedYear}-${this.selectedMonth.toString().padStart(2, '0')}-${'10'}`;
    console.log(this.limit_date)


    this.getData();


    
  }
  getData() {
    this.limitService.getLimitList()
      .subscribe(response => {
        this.categoriesLimited = response;
        console.log('AAAAAAAAAAAAAAA', this.categoriesLimited);
      });

      this.expenseCategoryService.getList()
      .subscribe(response => {
        this.expenseCategories = response;
        console.log(this.expenseCategories);

      });
      
      this.expenseService.getExpensesList()
        .subscribe(response => {
          console.log('minhas despesas', response);
          this.expenses = response;
       });

  }





  


  createLimit(item: any): void {
    this.limitService.addLimit(item)
      .subscribe(() => {
        this.getData();
      });
  }
  deleteLimitListItem(id: string): void {
    this.limitService.deleteLimit(id)
    .subscribe(() => {
      this.getData();
    });
  }
  updateLimitListItem(id: string, item: any): void {
    this.limitService.updateLimit(id, item)
      .subscribe(() => {
        this.getData();
      });
  }

 

  

  
}


