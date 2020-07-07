import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatCommonModule, MatLineModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { HeadTableComponent } from './head-table/head-table.component';
import { TableCellComponent } from './the-table/table-cell/table-cell.component';
import { TheTableComponent } from './the-table/the-table.component';


@NgModule({
  declarations: [
    TheTableComponent,
    TableCellComponent,
    HeadTableComponent,    
  ],
  imports: [
    RouterModule,
    CommonModule,
    CdkAccordionModule,
    MatSidenavModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatLineModule,
    MatBadgeModule,
    MatChipsModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatRadioModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    FormsModule,
    MatCommonModule,
    MatProgressSpinnerModule,
    CdkTableModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatDatepickerModule,
    FlexLayoutModule
    ],
  exports: [
    TheTableComponent,
    HeadTableComponent,
    
   ],
  providers: [
]
})
export class TheTableModule { }
