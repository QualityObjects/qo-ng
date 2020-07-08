import { Observable } from "rxjs";
import { PageData, PaginationDataRequest } from './pagination';

export interface IPaginationService<T> {
    getPage(pagRequest: PaginationDataRequest) : Observable<PageData<T>>;
}
