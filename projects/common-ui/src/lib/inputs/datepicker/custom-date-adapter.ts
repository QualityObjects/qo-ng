import { Platform } from '@angular/cdk/platform'
import { NativeDateAdapter } from '@angular/material/core'
import { DateTime } from 'luxon';

export class CustomDateAdapter extends NativeDateAdapter {
  
  constructor(matDateLocale: string, platform: Platform) {
    super(matDateLocale, platform);
    super.setLocale('es');
  }

  parse(value: any): Date | null {
    return CustomDateAdapter.convert(value)?.toJSDate();
  }

  createDate(year: number, month: number, date: number) : Date {
    return new Date(year, month, date);    
  }

  format(date: Date, displayFormat: any): string {
    //let d: DateTime = CustomDateAdapter.convert(date);
  //  console.log(`format() ${displayFormat}  --> ${d.toFormat(displayFormat, { locale: this.matDateLocale })}`)
    //return d.toFormat(displayFormat, { locale: this.matDateLocale });
    return super.format(date, displayFormat);
  }

  public static convert(dateRawValue: any, locale: string = 'es'): DateTime {
    if (!dateRawValue) {
      return null;
    } else {
      if (dateRawValue instanceof Date) {
        return DateTime.fromJSDate(dateRawValue);
      } else if (dateRawValue._isAMomentObject) {
        return DateTime.fromJSDate(dateRawValue.toDate());
      } else if (typeof dateRawValue === 'number') {
        return DateTime.fromMillis(dateRawValue);
      } else if (typeof dateRawValue === 'string') {
        let date = (dateRawValue.length >= 8 && dateRawValue.length <= 10) && DateTime.fromISO(dateRawValue);
        if (!date.isValid) {
          // see: https://moment.github.io/luxon/docs/manual/parsing.html#table-of-tokens
          date = DateTime.fromFormat(dateRawValue, "D", {locale: locale});
        }
        if (!date.isValid) {
          date = DateTime.fromFormat(dateRawValue, "MMM YYYY", {locale: locale}).startOf('month');
        }
        return date.isValid ? date : null;
      }
    }
  }

}
