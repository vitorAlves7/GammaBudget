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

      
    if (selectedOption === 'todos') {
        return items;
    }

    if (selectedOption === 'despesa') {
      return items.filter(item => item.valor < 0);
    } else  {
      return items.filter(item => item.valor > 0);
    } 
  }
  }
