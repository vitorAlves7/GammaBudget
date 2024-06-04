import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-month-selector',
  templateUrl: './month-selector.component.html',
  standalone: true,
  styleUrl: './month-selector.component.scss',
  imports: [],
})
export class MonthSelectorComponent {
  monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];


  @Input() selectedMonth; // Mês atual
  @Input()selectedYear; // Ano atual

  @Output() monthYearChanged: EventEmitter<{ month: number, year: number }> = new EventEmitter();

  constructor() {
    this.selectedMonth = new Date().getMonth();
    console.log( this.selectedMonth)
    this.selectedYear = new Date().getFullYear();
  }




  previousMonth() {
    if (this.selectedMonth === 0) {
      this.selectedMonth = 11;
      this.selectedYear--;
    } else {
      this.selectedMonth--;
    }
    this.emitChanges();
  }

  nextMonth() {
    if (this.selectedMonth === 11) {
      this.selectedMonth = 0;
      this.selectedYear++;
    } else {
      this.selectedMonth++;
    }
    this.emitChanges();
  }

  emitChanges() {
    this.monthYearChanged.emit({ month: this.selectedMonth, year: this.selectedYear });
  }
}
