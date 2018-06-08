import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutStepRoutingModule } from './layout-step-routing.module';
import { LayoutStepComponent } from './layout-step.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutStepRoutingModule
  ],
  declarations: [LayoutStepComponent]
})
export class LayoutStepModule { }
