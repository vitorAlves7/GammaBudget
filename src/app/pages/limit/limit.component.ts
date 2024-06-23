import { Component } from '@angular/core';
import { ExpenseCategory } from '../../types/expense-category';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { ExpenseLimitBarComponent } from '../../components/expense-limit-bar/expense-limit-bar.component';
import { Expense } from '../../types/expense-type';

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
  id?: string;
  label: string;
  value: number;
  max: number;
  year: number;
  month: number;
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
export class LimitComponent {
  expenseCategories: ExpenseCategory[] = [
    {
      id: '1',
      name: 'Moradia',
    },
    {
      id: '2',
      name: 'Alimentação',
    },
    {
      id: '3',
      name: 'Transporte',
    },
  ];

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

  constructor(private fb: FormBuilder) {
    this.limitForm = this.fb.group({
      category: [null, Validators.required],
      limitAmount: [null, [Validators.required, Validators.min(0.01)]],
    });

    // Sync the form values with the component variables
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
    this.closeModal();

    if (
      !this.categoriesLimited.find(
        (category) =>
          category.label === this.getNameCategoryById(this.selectedCategoryLimit) &&
          category.month === this.selectedMonth &&
          category.year === this.selectedYear
      )
    ) {
      this.createLimitCategoryBar(
        this.getNameCategoryById(this.selectedCategoryLimit),
        this.limitAmount,
        this.selectedMonth,
        this.selectedYear
      );
     
    } 
  }

  createLimitCategoryBar(
    selectedCategoryLimit: any,
    limitAmount: any,
    selectedMonth: number,
    selectedYear: number
  ) {
    const categorieLimited = {
      label: selectedCategoryLimit,
      value: this.calculateValueCategory(
        this.getNameCategoryById(this.selectedCategoryLimit)
      ),
      max: limitAmount,
      year: selectedYear,
      month: selectedMonth,
    };
    this.categoriesLimited.push(categorieLimited);
    console.log(this.categoriesLimited);
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

      console.log(year);
      console.log(month);

      const isSameYear = Number(year) === this.selectedYear;
      const isSameMonth = Number(month) === this.selectedMonth + 1;
      const isSameCategory = category.label == item.category.name;
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
    this.newLimit = this.categorySelected.max;
  }
  saveNewLimit() {
    this.categorySelected.max = this.newLimit;
    this.categoriesLimited.map((item) =>
      item.id === this.categorySelected.id
        ? { ...item, ...{ max: this.categorySelected.max } }
        : item
    );
    console.log(this.categoriesLimited);
    this.editLimit = false;
  }
  deleteCategoryLimited() {
    this.categoriesLimited = this.categoriesLimited.filter(
      (item) => item.id !== this.categorySelected.id
    );
    console.log(this.categoriesLimited);
    this.showSelectedCategoryLimitModal = false;
  }

  ngOnInit(): void {
    console.log(this.selectedMonth, this.selectedYear);

    this.categoriesLimited = [
      {
        id: '1',
        label: 'Alimentação',
        value: 1200,
        max: 1000,
        year: 2024,
        month: 5,
      },

      {
        id: '2',
        label: 'Alimentação',
        value: 450,
        max: 1000,
        year: 2024,
        month: 6,
      },

      { id: '3', label: 'Saúde', value: 450, max: 2000, year: 2024, month: 5 },
    ];

    this.expenses = [
      {
        id: 1,
        name: 'Fruta',
        description: 'Pagamento do aluguel mensal',
        amount: 1200.0,
        expiration_date: '2024-06-02',
        paid: false,
        payment_date: '',
        alert: true,
        alert_date: '2004-06-25',
        category: {
          id: '1',
          name: 'Alimentação',
        },
      },
      {
        id: 2,
        name: 'Supermercado',
        description: 'Compras do mês',
        amount: 450.0,
        expiration_date: '2024-07-05',
        paid: false,
        payment_date: '',
        alert: true,
        alert_date: '2024-06-30',
        category: {
          id: '2',
          name: 'Alimentação',
        },
      },
      {
        id: 3,
        name: 'Internet',
        description: 'Fatura da internet',
        amount: 100.0,
        expiration_date: '2024-06-10',
        paid: false,
        payment_date: '',
        alert: true,
        alert_date: '2024-07-05',
        category: {
          id: '3',
          name: 'Transporte',
        },
      },
      {
        id: 4,
        name: 'Academia',
        description: 'Mensalidade da academia',
        amount: 800.0,
        expiration_date: '2024-06-12',
        paid: false,
        payment_date: '',
        alert: true,
        alert_date: '2024-07-07',
        category: {
          id: '2',
          name: 'Saude',
        },
      },
    ];
  }
}
