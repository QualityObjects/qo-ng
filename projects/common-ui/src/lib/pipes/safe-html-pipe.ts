import { Directive, ElementRef, Input } from '@angular/core';
/*
@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
*/

@Directive({
  selector: '[directHtml]'
})
export class DirectHTMLDirective {
  @Input('directHtml') directHtml: string;
  constructor(private el: ElementRef) {
   }

   ngOnChanges() {
    this.el.nativeElement.innerHTML = this.directHtml || '';
  }
}