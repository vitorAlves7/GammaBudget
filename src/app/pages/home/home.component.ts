import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopExpensesComponent } from '../../components/top-expenses/top-expenses.component';
import { TotalExpensesComponent } from '../../components/total-expenses/total-expenses.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavbarComponent,TopExpensesComponent,TotalExpensesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
