import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  standalone: true,
  name: 'item',
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: any[], filterText: string): any[] {
    if (!items || !filterText) {
      return items;
    }
    filterText = filterText.toLowerCase();
    return items.filter(item => item.name.toLowerCase().includes(filterText));
  }
}
