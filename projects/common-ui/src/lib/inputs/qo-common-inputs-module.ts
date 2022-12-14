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
import { DateAdapter, MatCommonModule, MatLineModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { DatePickerComponent } from './datepicker/datepicker.component';
import { UploadFileComponent } from './file-upload/upload-file-dnd.component';
import { DragAndDropModule } from '../upload-file-dnd/drag-and-drop-module';
import { MontChangerComponent } from './month-changer/month-changer.component';
import { CustomDateAdapter } from './datepicker/custom-date-adapter';
import { Platform } from '@angular/cdk/platform';


@NgModule({
  declarations: [
    DatePickerComponent,
    UploadFileComponent,
    MontChangerComponent,
  ],
  imports: [
    RouterModule,
    DragAndDropModule,
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
    ],
  exports: [
    DatePickerComponent,
    MontChangerComponent,
    UploadFileComponent
   ],
  providers: [
    {
      provide: DateAdapter,
      useClass: CustomDateAdapter,
      deps: [MAT_DATE_LOCALE, Platform]
    }
  ]
})
export class QOCommonInputsModule { }
