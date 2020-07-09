import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'filter'})
export class FilterPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(items: any[], fields: string[], searchText: string) {
    if (!items || !searchText || !fields || fields.length === 0) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      for(let i = 0; i < fields.length; i++) {
        let fieldText = `${item[fields[i]]}`.toLowerCase();
        if (!!fieldText && fieldText.includes(searchText)) {
          return true;
        }
      }
      return false;
    });
  }
}