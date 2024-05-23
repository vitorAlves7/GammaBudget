import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TopExpensesComponent } from '../../components/top-expenses/top-expenses.component';
import { TotalExpensesComponent } from '../../components/total-expenses/total-expenses.component';
import { HomeChartComponent } from '../../components/home-chart/home-chart.component';
import { UpcomingExpensesComponent } from '../../components/upcoming-expenses/upcoming-expenses.component';
import { GeneralInformationComponent } from '../../components/general-information/general-information.component';



@Component({
  selector: 'app-home',
  standalone: true,
  imports:
    [
      NavbarComponent,
      TopExpensesComponent,
      TotalExpensesComponent,
      HomeChartComponent,
      UpcomingExpensesComponent,
      GeneralInformationComponent
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
