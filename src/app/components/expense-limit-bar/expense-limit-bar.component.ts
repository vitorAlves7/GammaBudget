import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-expense-limit-bar',
  standalone: true,
  imports: [NgApexchartsModule,CommonModule],
  templateUrl: './expense-limit-bar.component.html',
  styleUrl: './expense-limit-bar.component.scss',
})
export class ExpenseLimitBarComponent implements OnInit {

  @Input()label!: string;
  @Input()value!: number;
  @Input()max!: number;
  @Input()icon!: string; 
  @Input()limit_date!: string;
  

  get percentage(): number {
    console.log(this.label,this.value,this.max, this.limit_date)
    return (this.value / this.max) * 100;
  }
   getIconPath(label: string): string {
    switch (label) {
      case 'Alimentação': return 'assets/pages/launches/categories-icons/food.png';
      case 'Assinaturas e serviços': return 'assets/pages/launches/categories-icons/service.png';
      case 'Casa': return 'assets/pages/launches/categories-icons/house.png';
      case 'Compras': return 'assets/pages/launches/categories-icons/purchase.png';
      case 'Cuidados pessoais': return 'assets/pages/launches/categories-icons/selfcare.png';
      case 'Dívidas e empréstimos': return 'assets/pages/launches/categories-icons/loan.png';
      case 'Educação': return 'assets/pages/launches/categories-icons/education.png';
      case 'Família': return 'assets/pages/launches/categories-icons/family.png';
      case 'Impostos': return 'assets/pages/launches/categories-icons/tax.png';
      case 'Investimentos': return 'assets/pages/launches/categories-icons/investiment.png';
      case 'Lazer': return 'assets/pages/launches/categories-icons/entertainment.png';
      case 'Mercado': return 'assets/pages/launches/categories-icons/market.png';
      case 'Pets': return 'assets/pages/launches/categories-icons/pet.png';
      case 'Presentes': return 'assets/pages/launches/categories-icons/presente.png';
      case 'Restaurantes': return 'assets/pages/launches/categories-icons/restaurante.png';
      case 'Saúde': return 'assets/pages/launches/categories-icons/saude.png';
      case 'Transporte': return 'assets/pages/launches/categories-icons/transporte.png';
      case 'Viagem': return 'assets/pages/launches/categories-icons/viagem.png';
      case 'Outros': return 'assets/pages/launches/categories-icons/another.png';
      default: return '';
    }
  }

  ngOnInit(): void {}
}
