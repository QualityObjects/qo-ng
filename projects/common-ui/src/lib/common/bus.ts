import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BusService implements OnDestroy {
    private channels : {[eventType: string] : Subject<any>} = {};

    ngOnDestroy() {
        Object.keys(this.channels).forEach(eventType => {
            let subject = this.channels[eventType];
            subject.complete();
            delete this.channels[eventType];
        });
    }
    
    constructor() {
    }

    public getEventSubject(eventType: string) : Subject<any> {
        let subject : Subject<any> = this.channels[eventType];
        if (!subject) {
            subject = new Subject();
            this.channels[eventType] = subject;
        }
        return subject;
    }

    public broadcast(eventId: string, payload: any) : void{
        let subject = this.getEventSubject(eventId);
        subject.next(payload);
    }


}

export enum BusEvent {
    LOGIN = 'login',
    TOGGLE_MAIN_MENU = 'toggle.main-menu',
    DESCRIPTORES_ACTUALIZADOS = 'descriptores.actualizados'
}