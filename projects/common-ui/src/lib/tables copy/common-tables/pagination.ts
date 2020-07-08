import { HttpParams } from '@angular/common/http';

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

    public toHttpParams() : HttpParams {
        let params = new HttpParams({ fromObject: this.filter });
        params = params.append("_page", `${this.page}`);
        params = params.append("_pageSize", `${this.pageSize}`);
        params = params.append("_sortDir", `${this.sortDir}`.toUpperCase() );
        this.sortFields.forEach(fieldName => {
            params = params.append("_sortFields", fieldName);
        })
        return params;
    }

    constructor(fields: Partial<PaginationDataRequest>) {
        Object.assign(this, fields);
    }

}

export class PageData<T> {
    content: T[];
    total: number;

    constructor(content = [], total = 0) {
        this.content = content;
        this.total = total;
    }
}



