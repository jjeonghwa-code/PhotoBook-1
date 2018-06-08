import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StyleStepRoutingModule } from './style-step-routing.module';
import { StyleStepComponent } from './style-step.component';

@NgModule({
  imports: [
    CommonModule,
    StyleStepRoutingModule
  ],
  declarations: [StyleStepComponent]
})
export class StyleStepModule { }
