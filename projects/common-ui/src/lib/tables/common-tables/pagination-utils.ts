import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { IPaginationService } from './IPaginationService';
import { PageData, PaginationDataRequest, FilterObject } from './pagination';
import { IExportCSVService } from './IExportCSVService';


export class DataSourceBase<T> implements DataSource<T> {

    private dataSubject = new BehaviorSubject<T[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private totalSubject = new BehaviorSubject<number>(0);
    public requestReloadEvents = new BehaviorSubject<any>(null);
    public get rows() : number {
        return this.dataSubject.value && this.dataSubject.value.length || 0; 
    }
    public get data() : T[] {
        return this.dataSubject.value; 
    }
    public loading$ = this.loadingSubject.asObservable();
    public total = this.totalSubject.asObservable();
    public is_empty: boolean = true;
    
    constructor(private listingService: IPaginationService<T> ) { 
    }

    connect(collectionViewer: CollectionViewer): Observable<T[]> {
        return this.dataSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.dataSubject.complete();
        this.loadingSubject.complete();
        this.totalSubject.complete();
    }

    public requestReload() {
        this.requestReloadEvents.next(null);
    }

    public loadPage(pageRequest: PaginationDataRequest) {
        let pagReq: PaginationDataRequest = new PaginationDataRequest(pageRequest);
        const noEmptyFilterFields = Object.keys(pagReq.filter || {})
            .filter(key => !!pagReq.filter[key])
            .reduce((obj, key) => {
                let value = pagReq.filter[key];
                if (value instanceof Date) {
                    value = value.toISOString();
                }
                obj[key] = value;
                return obj;
            }, {});
        pagReq.filter = noEmptyFilterFields;
        this.loadingSubject.next(true);
        this.listingService.getPage(pagReq).pipe(
            catchError(() => of(new PageData())),
            tap((pData: PageData<T>) => {
                this.totalSubject.next(pData.total);
            }),
            finalize(() => this.loadingSubject.next(false))
        ).subscribe((pageData: PageData<T>) => {
            this.dataSubject.next(pageData.content);
            this.is_empty = !pageData.content || !pageData.content.length;
        });
    }

}
