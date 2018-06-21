import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutStepRoutingModule } from './layout-step-routing.module';
import { LayoutStepComponent } from './layout-step.component';
import { LayoutStateService } from './services/layout-state.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutStepRoutingModule
  ],
  declarations: [LayoutStepComponent],
  providers: [
    LayoutStateService
  ]
})
export class LayoutStepModule { }
