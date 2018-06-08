import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoverStepRoutingModule } from './cover-step-routing.module';
import { CoverStepComponent } from './cover-step.component';

@NgModule({
  imports: [
    CommonModule,
    CoverStepRoutingModule
  ],
  declarations: [CoverStepComponent]
})
export class CoverStepModule { }
