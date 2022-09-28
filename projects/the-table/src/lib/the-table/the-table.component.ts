import { Component, Input, OnInit, ViewChild, TemplateRef, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { merge, Subscription } from 'rxjs';
import { TableColumnDef, RowActions, DnDRowAction, HeaderAction } from '../tables-common';
import { DataSourceBase } from '../pagination-utils';
import { PaginationDataRequest, FilterObject } from '../pagination';
//import { translate } from '@ngneat/transloco';
import { trigger, state, transition, style, animate, keyframes } from '@angular/animations';
import { take, finalize } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/table';
import { SelectionModel } from '@angular/cdk/collections';

export const SELECTION_COLUMN = 'checkbox';
export const ACTIONS_COLUMN = 'actions';
export const PAGE_SIZE_VALUES = [15, 30, 100, 500];

export interface ExpandCollapseEvent {
  row: any;
  action?: RowActions<any>;
}

@Component({
  selector: 'the-table',
  templateUrl: 'the-table.component.html',
  styleUrls: ['the-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', display: 'none' })),
      state('expanded', style({ height: '*' })),
      transition(':enter', [
        style({ height: '0px', minHeight: '0', overflowY: 'hidden', opacity: 0 }),
        animate('250ms  cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '*', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ height: '*', overflowY: 'hidden', opacity: 1 }),
        animate('250ms cubic-bezier(0.4, 0.0, 0.2, 1)', style({ height: '0px', minHeight: '0', opacity: 0 }))
      ]),
    ]),
    trigger('toggleIcon', [
      state('collapsed', style({ transform: 'rotate(0)', transformOrigin: 'center center' })),
      state('expanded', style({ transform: 'rotate(-180deg)', transformOrigin: 'center center', marginBottom: "10px" })),
      transition('expanded => collapsed', animate('300ms ease-out')),
      transition('collapsed => expanded', animate('300ms ease-in'))
      //transition('expanded <=> collapsed', animate('2225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
    trigger('toggleIcons', [
      state('collapsed', style({ transform: 'rotate(0)', opacity: 1 })),
      state('expanded', style({ transform: 'rotate(360deg)', opacity: 1 })),
      transition('expanded <=> collapsed',
        animate('1s ease-out', keyframes([
          style({ opacity: 0, offset: 0 }),
          style({ transform: 'rotate(180deg)', opacity: 0.5, offset: 0.5 }),
        ]))),

      //transition('expanded <=> collapsed', animate('2225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class TheTableComponent implements OnInit {

  /**
   * All columns that can be shown in the table
   */
  @Input('columns')
  public columns: TableColumnDef<any>[] = [];

  /**
   * Columns to show in the table. Based in ColumnDef IDs
   */
  @Input('visibleColumns')
  public visibleColumns: string[] = [];

  /**
   * List of defined row actions
   */
  @Input('actions')
  public actions: RowActions<any>[];

  public getShowColapseMenu(info: any): boolean {
    return this.actions.filter(action => action.collapseInMenu && action.show(info)).length>0;
  };

  /**
   * The width of the row actions (fxFlex)
   */
  @Input('actionsColFlex')
  public actionsColFlex: number = 0;

  /**
   * Action to be executed in the actions column header
   */
  @Input('headerAction')
  public headerAction: HeaderAction;

  /**
   * If true the current table is paged
   */
  public pagedTable: boolean = false;

  /**
   * Return the current DataSource as a DataSourceBase<any> (a DS for paged tables).
   * If the current table is not paged return null
   */
  public get pagedDs(): DataSourceBase<any> {
    return !!this.pagedTable ? this.dataSource as DataSourceBase<any> : null;
  }

  public dataSource: DataSource<any>;

  /**
   * Table datasource, we can pass a simple array for non-paged tables
   */
  @Input('dataSource')
  public set data(ds: DataSourceBase<any> | any[]) {
    if (!ds || Array.isArray(ds)) {
      this.dataSource = new MatTableDataSource<any>(ds as Array<any>);
      this.pagedTable = false;
      if (this.sort) {
        (this.dataSource as MatTableDataSource<any>).sort = this.sort;
      }
    } else {
      this.dataSource = ds as DataSourceBase<any>;
      this.pagedTable = true;
    }
  }

  /**
   * Return true if the table has no data
   */
  public isEmpty(): boolean {
    if (!this.dataSource) {
      return true;
    }
    if (!!this.pagedTable) {
      return this.pagedDs.is_empty;
    } else {
      (<any>this.dataSource as MatTableDataSource<any>).data.length;
    }
  }

  //@ViewChildren('tplSliderCell2,tplSliderCell3')
  //public queryTemplates: QueryList<TemplateRef<any>>;

  public tpls: { [key: string]: TemplateRef<any> } = {}


  /**
   * Initial page size.
   * Only for paged tables
   */
  @Input('initialPageSize')
  public initialPageSize: number = PAGE_SIZE_VALUES[0];

  /**
   * Current filter.
   * Only for paged tables
   */
  @Input('filter')
  public filter: FilterObject = {};
  private previousFilter: FilterObject = {};

  /**
   * Inital sort field/s based on columnDef ID.
   * Only for paged tables
   */
  @Input('initialSort')
  public firstSortField: string;

  /**
   * Inital sort direction
   * Only for paged tables
   */
  @Input('firstSortDir')
  public firstSortDir: ('asc' | 'desc') = 'asc';

  /**
   * Enable highlight the row when mouse hover
   */
  @Input('highlight') // TODO: [rsanchez] Cambiar nombre por higlight
  public highlight: boolean;

  /**
   * Custom css class to personalize table look&feel
   */
  @Input('tableClass')
  public tableClass: string;

  /**
   * Set the handler to manger the drop event on a table row
   * A non-null value enable the DnD on the table
   */
  @Input('dndRowAction')
  public dndRowAction: DnDRowAction<any>;

  /**
   * Función definida en el padre que determina si una fila puede ser seleccionada o no
   */
  @Input('rowSelectable')
  public rowSelectable: (row: any) => boolean;

  /**
   * Event fired when a row is collapsed
   */
  @Output('onRowCollapsed')
  private onRowCollapsed: EventEmitter<ExpandCollapseEvent> = new EventEmitter<ExpandCollapseEvent>();

  /**
   * Event fired when a row is expanded
   */
  @Output('onRowExpanded')
  private onRowExpanded: EventEmitter<ExpandCollapseEvent> = new EventEmitter<ExpandCollapseEvent>();

  /**
   * If true the DnD is disabled, only one DnD action is possible at once
   */
  public dropInProgress: boolean = false;

  /**
   * Reference to the template to be shown on detail row
   */
  public tplToExpand: TemplateRef<any>;
  /**
   * The row that is currently shown in the detail view
   */
  public expandedElement: any;
  /**
   * The drop event with the files that will be passed to the DnD action returned template
   * as an additional parameter (dropEvent param)
   */
  public dropEvent: any;

  /**
   * Array that save the number of elements that show for page
   */
  public pageSizeOptions: number[] = PAGE_SIZE_VALUES;

  /**
   * Factory method to create a function that close the detail view.
   * This is usefull to allow close de view from inside the own templqte
   * It's passed as parameter to detail tempalte when is shown.
   */
  collapseRef(): () => void {
    return () => this.expandedElement = null;
  }

  /**
   * Method to open or close the detail view based in the row and action passed.
   * If the current row is shown the detail view from the same action then the detail view is closed
   * otherwise It opens the detail view with the proper TemplateRef.
   * @param row
   * @param action
   */
  toggleDetailRow(row: any, action: RowActions<any> | TemplateRef<any>): void {
    this.dropEvent = null;
    if (!!this.expandedElement) {
      this.onRowCollapsed.emit({ row: this.expandedElement })
    }
    let isAction = !!action['detailTemplate'];
    if (isAction) {
      this.expandedElement = (this.isActionExpanded(row, action as RowActions<any>)) ? null : row;
      this.onRowExpanded.emit({ row: this.expandedElement, action: action as RowActions<any> })
    } else {
      this.expandedElement = row;
      this.onRowExpanded.emit({ row: this.expandedElement })
    }
    let tplRef = isAction ? (action as RowActions<any>).detailTemplate : action as TemplateRef<any>;
    this.tplToExpand = (!!this.expandedElement) ? tplRef : null;
  }

  /**
   * Show the proper (expanded/collpased) icon on actions that open the detail view
   * @param row
   * @param action
   */
  toggleCustomIcon(row: any, action: RowActions<any>): string {
    let icon = this.isActionExpanded(row, action) && !!action.expandedIcon ? action.expandedIcon : action.icon;
    return icon.split(' ')[1];
  }

  /**
   * Returns true if the detail view is opened for the given row, false otherwise
   * @param row
   */
  isExpanded(row: any): boolean {
    return this.expandedElement === row;
  }

  /**
   * Returns true if the detail view is opened for the given row and action, false otherwise
   *
   * @param row
   * @param action
   */
  isActionExpanded(row: any, action: RowActions<any>): boolean {
    return this.isExpanded(row) && this.tplToExpand === action.detailTemplate;
  }


  /**
   * Manage the selected rows in the table
   */
  @Input('selection')
  public set selection(items: any[]) {
    this.selectionModel.select(...items);
  }

  public get selection(): any[] {
    return this.selectionModel.selected;
  }

  /**
   * Event fired when the selected rows change. The evnet data is an array with the selected rows.
   */
  @Output('selectionChange')
  public selectionChange: EventEmitter<any[]> = new EventEmitter<any[]>();

  /**
   * List of defined footer button actions
   */
   @Input('footerButtons')
   public footerButtons: RowActions<any>[];

  /**
   * Manage the selected rows in the table
   * The selecion is cleared when refresh.
   */
  public selectionModel: SelectionModel<any> = new SelectionModel<any>(true);


  /**
   * Sortable columns list. Used in mobile view
   */
  public get sortableColumns(): TableColumnDef<any>[] {
    if (!this.columns) {
      return [];
    }
    return this.columns.filter(c => c.sortable);
  }

  // TODO: [rsanchez] Review with mobile view
  //public order_by: string;

  private subscription: Subscription = new Subscription();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  traductorRangeLabel = (page: number, pageSize: number, length: number) => {
    /* let filterliteral: string = translate('global.of') || "de";  //por ejemplo: 2 de 5 */
    let filterliteral: string = "de";  //por ejemplo: 2 de 5
    if (length == 0 || pageSize == 0) {
      return `0 ${filterliteral} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${filterliteral} ${length}`;
  }

  ngOnInit() {
    this.sort.active = this.firstSortField || (this.columns.length > 0 ? this.columns[0].columnDef : '');
    this.sort.direction = this.firstSortDir;

    if (!!this.pagedTable) {
      this.paginator.pageSize = PAGE_SIZE_VALUES[0];
      /* this.paginator._intl.itemsPerPageLabel = translate('table.elements-per-page') || "Elementos por página"; */
      this.paginator._intl.itemsPerPageLabel = "Elementos por página";
      /* this.paginator._intl.nextPageLabel = translate('table.next-page') || "Página siguiente"; */
      this.paginator._intl.nextPageLabel = "Página siguiente";
      this.paginator._intl.previousPageLabel =  "Página anterior";
      /* this.paginator._intl.previousPageLabel = translate('table.previous-page') || "Página anterior"; */
      this.paginator._intl.getRangeLabel = this.traductorRangeLabel;
      this.subscription.add(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0));

      this.subscription.add(merge(this.sort.sortChange, this.paginator.page).subscribe(() => this.loadPage()));
      this.subscription.add(this.pagedDs.requestReloadEvents.subscribe(() => this.refresh()));
    } else {
      (this.dataSource as MatTableDataSource<any>).sort = this.sort;
    }

    this.subscription.add(this.selectionModel.changed.subscribe(selection => {
      this.selectionChange.emit(selection.source.selected);
    }));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Reload the data and back to first page
   * Only for paged tables
   */
  refresh() {
    if(this.previousFilter != this.filter) {
      this.paginator.pageIndex = 0;
      this.previousFilter = this.filter;
     }
    this.loadPage();
  }

  /**
   * Send a new request the the DataSource to load a new page
   * Only for paged tables
   */
  loadPage() {
    this.pagedDs.loadPage(new PaginationDataRequest({
      filter: this.filter,
      page: this.paginator.pageIndex + 1,
      pageSize: this.paginator.pageSize,
      sortDir: this.sort.direction || 'asc',
      sortFields: this.getSortFields()
    }));
    this.selectionModel.clear();
  }

  /**
   * Return the list of sort fields to send to the request.
   * Only for paged tables
   */
  private getSortFields(): string[] {
    let colDef: TableColumnDef<any> = this.columns.find(c => c.columnDef === this.sort.active);
    if (!colDef) {
      return ['id'];
    }
    return colDef.sort_fields || [colDef.columnDef];
  }

  /**
   *
   * @param new_order Handler for sort field change
   */
  changeOrderByMobile(new_order) {
    this.sort.active = new_order;
    this.sort.sortChange.emit(this.sort);
  }

  /**
   * Handler for DnD events on a row
   * @param evt
   * @param row
   */
  public onRowDrop(evt: any, row: any): void {
    this.dropInProgress = true;
    this.dndRowAction.onDrop(evt, row)
      .pipe(
        take(1),
        finalize(() => {
          this.dropInProgress = false;
        }))
      .subscribe(tplRef => {
        if (!!tplRef) {
          this.toggleDetailRow(row, tplRef);
          this.dropEvent = evt;
        }
        // TODO: [rsanchez] Revisar si es necesario un refresh y como gestionarlo
      });
  }

  /**
   * Calculate the total width in % from "flex" columns property
   */
  public totalVisibleColumnsWidth(): number {
    return this.columns.filter(c => this.visibleColumns.includes(c.columnDef))
      .map(c => Number(c.flex))
      .reduce((a: number, b: number) => a + b, 0);
  }

  /**
   * Recalculate the column width proportionally to the total of flex values asigned to visible columns
   * @param flex
   */
  public getColumnWidth(flex: number): number {
    //console.log('flex:', flex, ', totalVisibleColumnsWidth: ', this.totalVisibleColumnsWidth(), ', minus: ', (100 - (this.actionsColFlex + (this.hasCheckboxColumn() ? 5 : 0))))
    return flex / this.totalVisibleColumnsWidth() * (100 - (this.actionsColFlex + (this.hasCheckboxColumn() ? 5 : 0)));
  }

  public hasCheckboxColumn(): boolean {
    return this.visibleColumns.includes(SELECTION_COLUMN);
  }

  public showMoreActionsMenu(row: any) : boolean {
    let visible = row._cache?.showMoreActionMenu;
    if (visible === undefined) {
      visible = !!this.actions.find(a => a.collapseInMenu && (!a.show || a.show(row)));
      row._cache = row._cache || {};
      row._cache.showMoreActionMenu = visible;
    }
    return visible;
  }
}
