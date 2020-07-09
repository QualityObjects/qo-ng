import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'filesize'})
export class FileSizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(data: string | number) {
    return FileSizePipe.getSizeStr(data);
  }

  public static getSizeStr(size: string | number) : string {
      if (!size) {
        return `${size}`;
      }
      let numSize = parseInt(`${size}`);
      if (numSize < 1024) {
          return `${size}b`;
      }
      if (numSize < 1024*1024) {
          return `${(numSize/1024.0).toFixed(1)}Kb`;
      }
      return `${(numSize/1024.0/1024.0).toFixed(1)}Mb`;
  }
}