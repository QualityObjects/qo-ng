import { AbstractControl } from '@angular/forms';

export function dniNieValidator(control: AbstractControl) {    
    const validRegex = /^[XYZ]?([0-9]{7,8})([A-Z])$/i;
    const dniLetters: string = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let valid: boolean = false;
    let value: string = control.value;
    if(value !== null && value !== ''){
        value = value.padStart(9, '0');
        value = value.toUpperCase().replace(/\s/, '');
        let niePrefix:string|number = value.charAt(0);
        switch (niePrefix) {
            case 'X':
                niePrefix = 0;
                break;
            case 'Y':
                niePrefix = 1;
                break;
            case 'Z':
                niePrefix = 2;
                break;
        }
        value = niePrefix + value.substr(1);
        if (validRegex.test(value)) {
            valid = (value.charAt(8) === dniLetters.charAt(parseInt(value, 10) % 23));
        }
    }
    return !valid ? { dniNie : true } : null;
}