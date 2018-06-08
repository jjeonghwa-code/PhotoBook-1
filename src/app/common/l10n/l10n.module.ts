import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  LocalizationModule,
  LocaleValidationModule
} from 'angular-l10n';

@NgModule({
  imports: [
    CommonModule,
    LocalizationModule,
    LocaleValidationModule,
  ],
  exports: [
    LocalizationModule,
    LocaleValidationModule
  ],
  declarations: []
})
export class L10nModule { }
