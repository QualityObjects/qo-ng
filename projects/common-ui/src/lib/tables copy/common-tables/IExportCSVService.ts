import { FilterObject } from "./pagination";

export interface IExportCSVService {
    getDownloadCSVUrl(fields: string[], header: string[], filter?: FilterObject, token?: string) : string;
}
