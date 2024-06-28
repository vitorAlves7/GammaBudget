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
      if (item.launch_date) {
        const itemDate = new Date(item.launch_date);
        return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
      } else if (item.expiration_date) {
        const itemDate = new Date(item.expiration_date);
        return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
      }

      else if (item.alert_date) {
        const itemDate = new Date(item.alert_date);
        return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
      }

      else if (item.limit_date) {
     
        const itemDate = new Date(item.limit_date);
        return itemDate.getMonth() === selectedMonth && itemDate.getFullYear() === selectedYear;
        
      }

      return false;
    });
  }

}



