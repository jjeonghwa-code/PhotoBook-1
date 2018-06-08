import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewStepRoutingModule } from './preview-step-routing.module';
import { PreviewStepComponent } from './preview-step.component';

@NgModule({
  imports: [
    CommonModule,
    PreviewStepRoutingModule
  ],
  declarations: [PreviewStepComponent]
})
export class PreviewStepModule { }
