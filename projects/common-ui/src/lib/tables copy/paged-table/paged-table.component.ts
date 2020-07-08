import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { merge, Subscription } from 'rxjs';
import { TableColumnDef, RowActions } from '../tables-common';
import { DataSourceBase } from '../common-tables/pagination-utils';
import { PaginationDataRequest, FilterObject } from '../common-tables/pagination';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'paged-table',
  templateUrl: 'paged-table.component.html',
  styleUrls: ['paged-table.component.scss']
})
export class PagedTableComponent implements OnInit {

  @Input('title')
  public title: string;

  @Input('exportCsvUrl')
  public exportCsvUrl: string = '';

  @Input('initialPageSize')
  public initialPageSize: number = 25;
  
  @Input('columns')
  public columns: TableColumnDef<any>[] = [];

  @Input('visibleColumns')
  public visibleColumns: string[] = [];

  @Input('actions')
  public actions: RowActions<any>[];

  @Input('actionsColFlex')
  public actionsColFlex: number = 7;

  @Input('dataSource')
  public dataSource: DataSourceBase<any>;

  @Input('filter')
  private filter: FilterObject = {};

  private previousFilter: FilterObject = {};

  @Input('tableClass')
  public tableClass: string = '';

  @Input('initialSort')
  public firstSortField: string;
  @Input('firstSortDir')
  public firstSortDir: ('asc' | 'desc') = 'asc';

  public get sortableColumns(): TableColumnDef<any>[] {
    if (!this.columns) {
      return [];
    }

    return this.columns.filter(c => c.sortable);
  }
  public order_by: string;

  private subscriptions: Subscription[] = [];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {

  }

  filterliteral: string = "de";  //por ejemplo: 2 de 5
  traductorRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 ${this.filterliteral} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${this.filterliteral} ${length}`;
  }

  ngOnInit() {
    this.sort.active = this.firstSortField || (this.columns.length > 0 ? this.columns[0].columnDef : '');
    this.sort.direction = this.firstSortDir;
    
    this.order_by = this.sort.active;
    

    this.paginator.pageSize = 5;
    this.paginator._intl.itemsPerPageLabel = 'Filas por página';
    this.paginator._intl.getRangeLabel = this.traductorRangeLabel;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }

  ngAfterViewInit() {

    // reset the paginator after sorting
    let sub = this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    this.subscriptions.push(sub);

    sub = merge(this.sort.sortChange, this.paginator.page).subscribe(() => this.loadPage());
    this.subscriptions.push(sub);

    sub = this.dataSource.requestReloadEvents.subscribe(() => this.refresh());
    this.subscriptions.push(sub);
  }

  classTable() {
    let cssClasses = ['section-block'];
    if (!!this.tableClass) {
      cssClasses.push(this.tableClass);
    }
    return cssClasses.join(' ');
  }

  refresh() {
    
    if(this.previousFilter != this.filter) {
     this.paginator.pageIndex = 0;
     this.previousFilter = this.filter;
    }
    this.loadPage();
  }

  loadPage() {
    this.dataSource.loadPage(new PaginationDataRequest({
      filter: this.filter,
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      sortDir: this.sort.direction || 'asc',
      sortFields: this.getSortFields()
    }));
  }

  private getSortFields() : string[] {
    let colDef : TableColumnDef<any> = this.columns.find(c => c.columnDef === this.sort.active);
    if (!colDef) {
      return ['id'];
    }
    return colDef.sort_fields || [colDef.columnDef];
  }

  changeOrderByMobile(new_order) {
    this.sort.active = new_order;
    this.order_by = this.sort.active;
    this.sort.sortChange.emit(this.sort);    
  }

  public cellText(column: TableColumnDef<any>, row: any) {
    let txt = column.cell(row);
    return txt;
  }

  public downloadCSV(): void {

  }
}


