import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepicker } from '@angular/material/datepicker';
import { Moment } from 'moment';
import { Interval, DateTime } from 'luxon';

@Component({
    selector: 'date',
    templateUrl: `./datepicker.component.html`,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatePickerComponent),
            multi: true
        }
    ]
})
export class DatePickerComponent implements ControlValueAccessor {

    public format: string = 'YYYY-MM-DD';


    public startView = 'month';

    private _monthInput : boolean = false; 

    @Input('monthInput') 
    public get monthInput() : boolean{
        return this._monthInput;
    } // el título

    public set monthInput(month_input : boolean) {
        this._monthInput = month_input;
        if (month_input) {
            this.startView = 'year';
        } else {
            this.startView = 'month';
        }
    }

    @Input('title') 
    public title: string; // el título

    @Input('readonly') 
    public readonly: boolean = false; 
    
    @Input('disabled') 
    public disabled: boolean = false; 

    @Input('min') 
    public min: any = 0;

    @Input('max')
    public max: any = 0;

    @Input('intervalList') 
    public intervalList: Array<Interval> = [];

    @Input('msgError') 
    public msgError: string;

    private _dateValue : DateTime;
    get dateValue() : any { // return always a string
        return this._dateValue != null && this._dateValue.toISODate() || null;
    }
    set dateValue(val: any) {
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
            if (this.monthInput && this._dateValue.day !== 1) {
                this._dateValue = this._dateValue.startOf('month');
            }
            this.propagateChange(this._dateValue.toISODate());
        }
    }

    addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
        this.dateValue = event.value;
        this.propagateTouched(true);
    }

    writeValue(value: any) {
        if (!!value) {
            this.dateValue = value;
        } else {
            this.dateValue = null;
        }
    }
    propagateChange = (_: any) => { };

    registerOnChange(fn) {
        this.propagateChange = fn;
    }

    propagateTouched = (_: any) => { };

    registerOnTouched(fn) {
        this.propagateTouched = fn;
     }

    /**
    * El filtro para desactivar las fechas
    */
    filterDays = (d: Moment): boolean => {
        let result: boolean = false;

        this.intervalList.forEach((interval: Interval) => {
            if (!result) {
                //console.log(`INTERVALO: ${interval.start.toISODate()} - ${interval.end.toISODate()}, FECHA: ${DateTime.fromJSDate(d.toDate()).toISODate()}, CONTIENE: ${interval.contains(DateTime.fromJSDate(d.toDate()))}`);
                result = interval.contains(DateTime.fromJSDate(d.toDate()));
            }
        });

        return !result;
    }

    chosenMonthHandler(monthDate: Date, datepicker: MatDatepicker<Date>) {
        if (this.monthInput) {
            this.dateValue = monthDate;
            datepicker.close();
        }
    }

}