import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'option',
})
export class OptionFilterPipe  implements PipeTransform {
  transform(items: any[], selectedOption: string): any[] {
    if (!items || !selectedOption) {
      return items;
    }

      
    if (selectedOption === 'all') {
        return items;
    }

    if (selectedOption === 'expense') {
      return items.filter(item => item.amount < 0);
    } else  {
      return items.filter(item => item.amount > 0);
    } 
  }
  }
