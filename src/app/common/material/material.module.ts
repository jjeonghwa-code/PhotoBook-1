import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatDialogModule,
  MatIconModule,
  MatSliderModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  declarations: []
})
export class MaterialModule { }
