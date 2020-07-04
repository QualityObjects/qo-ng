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
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { AppTooltipEllipsisDirective } from './app-tooltip/app-tooltip-ellipsis.directive';
import { AppTooltipComponent, AppTooltipDirective } from './app-tooltip/app-tooltip.component';
import { ConfirmDialog3OptionsComponent } from './confirm-dialog-3options/confirm-dialog-3options.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DatePickerComponent } from './datepicker/datepicker.component';
import { FormHeaderComponent } from './form-header/form-header.component';
import { HeadTableComponent } from './head-table/head-table.component';
import { LeftMenuComponent } from './left-menu/left-menu.component';
import { ListingTableComponent } from './tables/listing-table/listing-table.component';
import { PagedTableComponent } from './tables/paged-table/paged-table.component';
import { DragDropDirective } from './upload-file-dnd/drag-drop.directive';
import { UploadFileComponent } from './upload-file-dnd/upload-file-dnd.component';


@NgModule({
  declarations: [
    ConfirmDialogComponent,    
    ConfirmDialog3OptionsComponent,
    HeadTableComponent,
    LeftMenuComponent,
    ListingTableComponent,
    PagedTableComponent,
    FormHeaderComponent,
    DatePickerComponent,
    AppTooltipComponent,
    AppTooltipDirective,
    AppTooltipEllipsisDirective,
    DragDropDirective,
    UploadFileComponent,

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
    entryComponents: [
      ConfirmDialogComponent,
      ConfirmDialog3OptionsComponent
    ],
  exports: [
    LeftMenuComponent,
    HeadTableComponent,
    ConfirmDialogComponent,
    ConfirmDialog3OptionsComponent,
    PagedTableComponent,
    ListingTableComponent,
    DatePickerComponent,
    FormHeaderComponent,
    AppTooltipComponent,
    AppTooltipDirective,
    AppTooltipEllipsisDirective,
    DragDropDirective,
    UploadFileComponent,
   ],
  providers: [ 
]
})
export class SharedModule { }
