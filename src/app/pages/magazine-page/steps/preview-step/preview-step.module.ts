import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@photobook/material';

import { PreviewStepRoutingModule } from './preview-step-routing.module';
import { PreviewStepComponent } from './preview-step.component';
import { PreviewFooterBarComponent } from './components/preview-footer-bar/preview-footer-bar.component';

@NgModule({
  imports: [
    CommonModule,
    PreviewStepRoutingModule,
    FlexLayoutModule,
    MaterialModule
  ],
  declarations: [PreviewStepComponent, PreviewFooterBarComponent]
})
export class PreviewStepModule { }
