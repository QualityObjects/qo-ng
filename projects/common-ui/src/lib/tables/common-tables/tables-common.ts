export class TableColumnDef<T> {
    columnDef: string;
    header: string;
    flex?: string | number;
    action?: (row: T) => void;
    cell?: (row: T) => string;
    cellToolTip?:(row:T) => string;
    cell_image?: (row: T) => string;
    cell_icon?: (row: T) => string;
    color?: string; //color solo aplicable al icono
    get_color?: (row: T) => string; //color solo aplicable al icono
    sortable: boolean = false;
    sort_fields?: string[]; // Una columna puede ordenar por más de un campo ['firstName', 'lastName']
    translate?: boolean = false;
  }
  
  export class RowActions<T> {
    icon?: string;
    name?: string;
    color?: string = "primary";
    tooltip?: string;
    show?: (row: T) => boolean;
    custom?: (row: T) => RowActions<T>;
    action?: (row: T) => void;
    href?: (row: T) => string;
    badgeNumber ?: (row: T) =>  number;
  }

export const STEPS_COLUMNS: number[] = [24, 20, 16, 12, 8];
