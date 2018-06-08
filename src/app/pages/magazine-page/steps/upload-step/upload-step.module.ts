import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';

import { UploadStateService } from './services/upload-state.service';

import { UploadStepRoutingModule } from './upload-step-routing.module';
import { UploadStepComponent } from './upload-step.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';

@NgModule({
  imports: [
    CommonModule,
    UploadStepRoutingModule,
    L10nModule,
    UiKitModule
  ],
  declarations: [
    UploadStepComponent,
    InfoBoxComponent
  ],
  providers: [
    UploadStateService
  ]
})
export class UploadStepModule { }
