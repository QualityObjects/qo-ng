import { Component, forwardRef,  Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor,  NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DateTime } from 'luxon';
import * as _moment from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

export const MESES: any [] = [
  { id: 1, label: 'Enero' },
  { id: 2, label: 'Febrero' },
  { id: 3, label: 'Marzo' },
  { id: 4, label: 'Abril' },
  { id: 5, label: 'Mayo' },
  { id: 6, label: 'Junio' },
  { id: 7, label: 'Julio' },
  { id: 8, label: 'Agosto' },
  { id: 9, label: 'Septiembre' },
  { id: 10, label: 'Octubre' },
  { id: 11, label: 'Noviembre' },
  { id: 12, label: 'Diciembre' }
];
//para gestionar el formulario:

@Component({
  selector: 'month-changer',
  templateUrl: './month-changer.component.html',
  styleUrls: ['month-changer.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => MontChangerComponent),
    }
  ]
})
export class MontChangerComponent implements ControlValueAccessor {
  public disabled: boolean;

  @Output('nextMonth') nextMonth = new EventEmitter<any>();
  @Output('previousMonth') previousMonth = new EventEmitter<any>();
  @Input('allowEmptyValue') allowEmptyValue: boolean = true;
  private _dateValue : DateTime = DateTime.local();
  private propagateChange = (_: any) => { };
  private _monthInput: boolean = false;
  
  public startView = 'year';

    
  get dateValueMonth() {
    return (!!this._dateValue && MESES[this._dateValue.month-1].label+', '+`${this._dateValue.year}`) || null;
}
get dateValue() {
  return this._dateValue != null && this._dateValue.toISODate() || null;
}
get hideCalendar(){
  return !!this._dateValue;
}

set dateValue(val:any) {
    if (!val) {
        this._dateValue = null;
        this.propagateChange(null);
    } else {
        if (val instanceof Date) {
            this._dateValue = DateTime.fromJSDate(val);
        } else if (val._isAMomentObject) {
            this._dateValue = DateTime.fromJSDate(val.toDate());
        } else {
            this._dateValue = DateTime.fromISO(val);
        }
        this.propagateChange(this._dateValue.toISODate());
    }
}

writeValue(value: any) {
  if (!!value) {
      this.dateValue = value;
  } else {
      this.dateValue = null;
  }
}

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  propagateTouched = (_: any) => { };
  registerOnTouched(fn): void {
   // this.propagateTouched = fn;
  }
  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.dateValue = event.value;
   // this.propagateTouched(true);
}
  chosenMonthHandler(monthDate: Date, datepicker: MatDatepicker<Date>) {
    
        this.dateValue = monthDate;
        datepicker.close();
    
}
goNextMonth(){
  this._dateValue = this._dateValue.plus({month: 1})
  this.propagateChange ( this._dateValue.toISODate())
}

goPreviousMonth(){ 
  this._dateValue = this._dateValue.minus({month: 1})
  this.propagateChange ( this._dateValue.toISODate())
 
}

clearFilter(){
  console.log(this.hideCalendar);  
  this._dateValue=null;
  this.propagateChange ( null)
}



}