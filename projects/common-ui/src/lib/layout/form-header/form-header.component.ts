import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'form-header',
  templateUrl: './form-header.component.html',
  styleUrls: ['./form-header.component.scss']
})
export class FormHeaderComponent implements OnInit {
  
  @Input('title') public title: string;
  @Input('previousPageName') public previousPage: string;
  @Input() public avatar: string; 
  @Output('onBack') public onBack = new EventEmitter<any>();
  @Input('icon') public icon: string;
  @Input('iconTooltip') public iconTooltip: string;
  constructor() { }

  ngOnInit() {
  }

  goBack() : void {
    this.onBack.emit('');
  }

  
}
