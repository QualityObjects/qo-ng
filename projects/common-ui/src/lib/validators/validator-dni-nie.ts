import { AbstractControl } from '@angular/forms';

export function dniNieValidator(control: AbstractControl) {    
    const validRegex = /^[XYZ]?([0-9]{7,8})([A-Z])$/i;
    const dniLetters: string = 'TRWAGMYFPDXBNJZSQVHLCKE';
    let valid: boolean = false;
    let value: string = control.value;
    if(value !== null && value !== ''){
        value = value.padStart(9, '0');
        value = value.toUpperCase().replace(/\s/, '');
        let niePrefix:string = value.charAt(0);
        let niePrefix1:number = 0;
        switch (niePrefix) {
            case 'X':
                niePrefix1 = 0;
                break;
            case 'Y':
                niePrefix1 = 1;
                break;
            case 'Z':
                niePrefix1 = 2;
                break;
        }
        value = niePrefix1 + value.substr(1);
        if (validRegex.test(value)) {
            valid = (value.charAt(8) === dniLetters.charAt(parseInt(value, 10) % 23));
        }
    }
    return !valid ? { dniNie : true } : null;
}