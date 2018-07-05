import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatDialogModule, MatIconModule, MatSliderModule, MatTooltipModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: []
})
export class MaterialModule { }
