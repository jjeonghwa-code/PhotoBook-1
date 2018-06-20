import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material';
import { SpinnerComponent } from './spinner/spinner.component';
import { ColorSliderComponent } from './color-slider/color-slider.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatProgressSpinnerModule
  ],
  exports: [
    SpinnerComponent,
    ColorSliderComponent
  ],
  declarations: [
    SpinnerComponent,
    ColorSliderComponent
  ]
})
export class UiKitModule { }
