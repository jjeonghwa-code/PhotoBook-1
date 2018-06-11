import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';
import { DragulaModule } from 'ng2-dragula';

import { UploadStateService } from './services/upload-state.service';

import { UploadStepRoutingModule } from './upload-step-routing.module';
import { UploadStepComponent } from './upload-step.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';

@NgModule({
  imports: [
    CommonModule,
    UploadStepRoutingModule,
    FlexLayoutModule,
    MatDialogModule,
    L10nModule,
    UiKitModule,
    DragulaModule
  ],
  declarations: [
    UploadStepComponent,
    InfoBoxComponent,
    DeleteConfirmModalComponent
  ],
  providers: [
    UploadStateService
  ],
  entryComponents: [
    DeleteConfirmModalComponent
  ]
})
export class UploadStepModule { }
