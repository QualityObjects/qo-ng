import { NgModule } from '@angular/core';
import { QOCommonDialogsModule } from './dialog/qo-common-dialog-module';
import { QOCommonInputsModule } from './inputs/qo-common-inputs-module';
import { QOLayoutModule } from './layout/qo-layout-module';
import { QOCommonPipesModule } from './pipes/pipes-module';
import { QOToolTipModule } from './qo-tooltip/qo-tooltip-module';
import { QOTablesModule } from './tables/tables-module';
import { DragAndDropModule } from './upload-file-dnd/drag-and-drop-module';


@NgModule({
  declarations: [
    

  ],
  imports: [
    QOCommonPipesModule,
    QOCommonInputsModule,
    DragAndDropModule,
    QOTablesModule,
    QOLayoutModule,
    QOToolTipModule,
    QOCommonDialogsModule,    
    ],
    entryComponents: [
    ],
  exports: [
    QOCommonPipesModule,
    QOCommonInputsModule,
    DragAndDropModule,
    QOTablesModule,
    QOToolTipModule,
    QOCommonDialogsModule,
    QOLayoutModule
   ],
  providers: [
]
})
export class QOSharedModule { }
