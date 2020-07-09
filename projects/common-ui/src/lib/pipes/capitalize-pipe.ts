import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'capitalize'})
export class CapitalizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(html) {
    return CapitalizePipe.capitalize(html)
  }

  public static capitalize(str: string) : string {
    if (!str) {
      return str;
    } else {
      return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }
  }
}