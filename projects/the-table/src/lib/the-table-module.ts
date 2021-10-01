import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { TableCellComponent } from './the-table/table-cell/table-cell.component';
import { TheTableComponent } from './the-table/the-table.component';


@NgModule({
  declarations: [
    TheTableComponent,
    TableCellComponent,
  ],
  imports: [
    
    RouterModule,
    CommonModule,
    CdkAccordionModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatBadgeModule,
    MatChipsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCommonModule,
    CdkTableModule,
    FlexLayoutModule
    ],
  exports: [

    TheTableComponent,
    TableCellComponent,
    
   ],
  providers: [
]
})
export class TheTableModule { }
