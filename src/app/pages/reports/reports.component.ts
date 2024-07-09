import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MonthYearFilterPipe } from '../../components/month-selector/month-year-filter/month-year-filter.pipe';
import { MonthSelectorComponent } from '../../components/month-selector/month-selector.component';
import { DailyChartComponent } from '../../components/daily-chart/daily-chart.component';

@Component({
  selector: 'reports',
  standalone: true,
  imports: [
    NavbarComponent,
    MonthSelectorComponent,
    MonthYearFilterPipe,
    DailyChartComponent,
  ],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent {
  selectedMonth: number = new Date().getMonth();
  selectedYear: number = new Date().getFullYear();

  limit_date: string = '';

  onMonthYearChanged(event: { month: number; year: number }) {
    this.selectedMonth = event.month;
    this.selectedYear = event.year;
    this.limit_date = `${this.selectedYear}-${(this.selectedMonth+1).toString().padStart(2, '0')}-${'10'}`;
  }

}
