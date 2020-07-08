import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

export class HeaderAction<T> {
  icon?: string;
  name?: string;
  color?: string = "primary";
  tooltip?: string ;
  show?: () => boolean;
  action: () => void;
}


@Component({
  selector: 'head-table',
  templateUrl: './head-table.component.html',
  styleUrls: ['./head-table.component.scss']
})
export class HeadTableComponent implements OnInit {

  @Input('showFilter') public showFilter: boolean =true; 
  @Input('title') public title: string;
  @Input('buttons') public buttons: HeaderAction<any>[];
  @Input('tooltip') public tooltip: string;
  @Output('onFilter') public onFilter: EventEmitter<any> = new EventEmitter();
  @Input('formFilter') public formFilter: FormGroup;

  constructor() { }

  ngOnInit() {
  
  }

  get showFilterButtons(): boolean {
    return this.onFilter.observers.length > 0;
  }

  applyFilter() {
    this.onFilter.emit();
  }

  resetFilter() {
    !!this.formFilter && this.formFilter.reset();
    setTimeout(() => {
      this.applyFilter();
    }, 0);

  }


}
