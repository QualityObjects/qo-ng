import { Directive, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';

export const CSS_CLASS_ON_DRAGOVER = 'drag-over';

@Directive({
  selector: '[drop-container]'
})
export class DragDropDirective {
  
  @HostBinding('class.' + CSS_CLASS_ON_DRAGOVER) public dragOver : boolean = false;

  @Output() fileDropped = new EventEmitter<any>();
	
  //Dragover listener
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = true;
  }
	
  //Dragleave listener
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
  }
	
  //Drop listener
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.dragOver = false;
    let files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.fileDropped.emit(files);
    }
  }
	
}