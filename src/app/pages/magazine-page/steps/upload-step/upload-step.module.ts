import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadStepRoutingModule } from './upload-step-routing.module';
import { UploadStepComponent } from './upload-step.component';

@NgModule({
  imports: [
    CommonModule,
    UploadStepRoutingModule
  ],
  declarations: [UploadStepComponent]
})
export class UploadStepModule { }
