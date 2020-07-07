import { Component, Input, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { TableColumnDef } from '../../tables-common';

export interface CellTemplateParams {
  row: any;
  column: TableColumnDef<any>;
}

type CellType = "text" | "img" | "icon" | "action" | "textAction" | "slider" | "chips" | "custom";

type TemplateTypeMap = { [key in CellType]?: TemplateRef<CellTemplateParams> };

@Component({
  selector: 'table-cell',
  templateUrl: 'table-cell.component.html',
  styleUrls: ['table-cell.component.scss']
})
export class TableCellComponent implements OnInit {

  private tplMap: TemplateTypeMap = {};

  @ViewChild('tpl_text', { static: true })
  set tplText(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.text = tpl;
  }

  @ViewChild('tpl_img', { static: true })
  set tplImg(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.img = tpl;
  }

  @ViewChild('tpl_icon', { static: true })
  set tplIcon(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.icon = tpl;
  }

  @ViewChild('tpl_action', { static: true })
  set tplAction(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.action = tpl;
  }

  @ViewChild('tpl_text_action', { static: true })
  set tplTextAction(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.textAction = tpl;
  }

  @ViewChild('tpl_slider', { static: true })
  set tplSlider(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.slider = tpl;
  }

  @ViewChild('tpl_chips', { static: true })
  set tplChips(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.chips = tpl;
  }

  @ViewChild('tpl_custom', { static: true })
  set tplCustom(tpl: TemplateRef<CellTemplateParams>) {
    this.tplMap.custom = tpl;
  }

  @Input()
  public row: any;

  public _column: TableColumnDef<any>;
  @Input()
  public set column(col: TableColumnDef<CellTemplateParams>) {
    this._column = col;
    this.type = this.getColumnType(col);
  }
  public get column(): TableColumnDef<CellTemplateParams> {
    return this._column;
  }

  private type: CellType;

  public cellTemplate: TemplateRef<any>;

  private getColumnType(column: TableColumnDef<any>): CellType {
    if (!!column.cell) {
      return 'text';
    }
    if (!!column.cell_icon) {
      return 'icon';
    }
    if (!!column.cell_image) {
      return 'img';
    }
    if (!!column.cell_action_show) {
      return 'action';
    }
    if (!!column.cell_text_action_show) {
      return 'textAction';
    }
    if (!!column.cell_slider) {
      return 'slider';
    }
    if (!!column.cell_chip) {
      return 'chips';
    }
    if (!!column.templateRef) {
      return 'custom';
    }

    return null;
  }

  ngOnInit(): void {
    //console.log(this.tplMap);
    this.cellTemplate = this.tplMap[this.type];
  }
}
