import { HttpParams } from '@angular/common/http';
import { Observable } from "rxjs";

/**
 * Tipo para enviar HttpParams, típico en filtro de listados
 */
export type FilterObject = { [param: string]: string | string[]; };

export class PaginationDataRequest {
    page: number;
    pageSize: number;
    sortFields: string[];
    sortDir: 'asc' | 'desc';
    filter?: FilterObject;

    public toHttpParams(): HttpParams {
        let params = new HttpParams({ fromObject: this.filter });
        params = params.append('page', `${this.page}`);
        params = params.append('pageSize', `${this.pageSize}`);
        params = params.append('sortDir', `${this.sortDir}`.toUpperCase());
        this.sortFields.forEach(fieldName => {
            params = params.append('sortFields', fieldName);
        });
        return params;
    }

    constructor(fields: Partial<PaginationDataRequest>) {
        Object.assign(this, fields);
    }

}

export class PageData<T> {
    data: T[];
    total: number;

    pageData: {
        size: number,
        totalElements: number,
        totalPages: number,
        number: number
    };


    constructor(data = [], total = 0) {
        this.data = data;
        this.total = total;
    }

}

export interface IPaginationService<T> {
    getPage(pagRequest: PaginationDataRequest): Observable<PageData<T>>;
}

