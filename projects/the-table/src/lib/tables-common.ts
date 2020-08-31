import { TemplateRef } from '@angular/core';
import { Observable } from 'rxjs';

export enum CellRenderType {
  TEXT,
  ICON,
  IMAGE,
  DYNAMIC,
  CUSTOM
}

export class ChipInfo {
  text: string;
  showIcon: boolean = false;
  iconColor?: string;
  fontSet?: string;
  fontIcon?: string;

  constructor(data: Partial<ChipInfo>) {
    Object.assign(this, data);
  }
}

export class TableColumnDef<T> {
  columnDef: string;
  header: string;
  flex?: string | number;
  templateRef?: TemplateRef<any>;
  cell?: (row: T) => string;
  cell_image?: (row: T) => string;
  cell_icon?: (row: T) => string;
  cell_slider?: (row: T) => boolean;
  cell_slider_change?: (value: boolean, row: any) => void;
  cell_slider_disabled?: boolean;
  color?: string; //color solo aplicable al icono
  get_color?: (row: T) => string; //color solo aplicable al icono
  sortable: boolean = false;
  sort_fields?: string[]; // Una columna puede ordenar por más de un campo ['firstName', 'lastName']
  translate?: boolean = false;
  align?: string;
  cell_tooltip?: (row: T) => string;
  cell_action_show?: (row: T) => boolean;
  cell_text_action_show?: (row: T) => boolean;
  cell_action_label?: (row: T) => string;
  cell_action?: (row: any) => RowActions<any>;
  cell_chip?: (row: T) => ChipInfo[];
  custom_css?: (row: T) => string;
}

export class RowActions<T> {
  icon?: string;
  name?: string;
  color?: string = "primary";
  tooltip?: (row: T) => string;
  expandedIcon?: string;
  custom?: (row: T) => RowActions<T>;
  action?: (row: T) => void;
  href?: (row: T) => string;
  detailTemplate?: TemplateRef<any>;
  show?: (row: T) => boolean;
  badgeNumber ?: (row: T) =>  number;
  collapseInMenu?: boolean = false;
}

export class DnDRowAction<T> {
  onDrop: (evt: any, row: T) => Observable<TemplateRef<any> | null>;
}

export class HeaderAction {
  icon?: string;
  name?: string;
  color?: string = "primary";
  tooltip?: string;
  show?: () => boolean;
  action: () => void;
}

export const STEPS_COLUMNS: number[] = [24, 20, 16, 12, 8];
