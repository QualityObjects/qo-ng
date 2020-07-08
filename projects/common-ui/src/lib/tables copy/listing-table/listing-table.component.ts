import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableColumnDef, RowActions, STEPS_COLUMNS } from '../tables-common';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'listing-table',
  templateUrl: 'listing-table.component.html',
  styleUrls: ['listing-table.component.scss']
})
export class ListingTableComponent implements OnInit {

  @Input('title')
  public title: string;

  @Input('columns')
  public columns: TableColumnDef<any>[] = [];

  @Input('visibleColumns')
  public visibleColumns: string[] = [];

  @Input('actions')
  public actions: RowActions<any>[];

  @Input('actionsColFlex')
  public actionsColFlex: number = 7;

  @Input('data')
  public set data(newData: any[]) {
    this.datasource = new MatTableDataSource(newData);
    this.datasource.sort = this.sort;
  }
  public get data() : any[] {
    return this.datasource && this.datasource.data;
  }

  public datasource : MatTableDataSource<any>;
  public get sortableColumns(): TableColumnDef<any>[] {
    if (!this.columns) {
      return [];
    }

    return this.columns.filter(c => c.sortable);
  }

  @Input('tableClass')
  public tableClass: string = '';

  @Input('firstSortField')
  public firstSortField: string;
  @Input('firstSortDir')
  public firstSortDir: ('asc' | 'desc') = 'asc';

  public order_by: string;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

  }

 
  ngOnInit() {
    this.sort.active = this.firstSortField || (this.columns.length > 0 ? this.columns[0].columnDef : '');
    this.sort.direction = this.firstSortDir;
    this.order_by = this.sort.active;
  }

  ngOnDestroy(): void {
  }

  ngAfterViewInit() {
  }

  classTable() {
    let cssClasses = ['section-block'];
    if (!!this.tableClass) {
      cssClasses.push(this.tableClass);
    }
    return cssClasses.join(' ');
  }


  private getSortFields() : string[] {
    let colDef : TableColumnDef<any> = this.columns.find(c => c.columnDef === this.order_by);
    if (!colDef) {
      return ['id'];
    }
    return colDef.sort_fields || [colDef.columnDef];
  }

  changeOrderByMobile(new_order) {
    this.order_by = new_order;
    this.sort.active = this.order_by;
    this.sort.sortChange.emit(this.sort);
  }

  public cellText(column: TableColumnDef<any>, row: any) {
    let txt = column.cell(row);
    return txt;
  }

}


