import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'monthYearFilter',
  standalone: true,
  pure: false
})
export class MonthYearFilterPipe implements PipeTransform {

  transform(items: any[], selectedMonth: number, selectedYear: number): any[] {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter(item => {
      const itemDate = new Date(item.data);
      return itemDate.getMonth()  === selectedMonth && itemDate.getFullYear() === selectedYear;
    });
  }

  

}
