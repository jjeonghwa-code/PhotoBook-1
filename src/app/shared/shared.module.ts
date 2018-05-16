import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NouisliderModule } from 'ng2-nouislider';
import { MaterialModule } from './material/material.module';
import { ComponentsModule } from './components/components.module';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {
  LocalizationModule,
  LocaleValidationModule
} from 'angular-l10n';

import { AppStateService, CommonService } from '../shared/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalizationModule,
    LocaleValidationModule,
    BsDatepickerModule.forRoot(),
    NouisliderModule,
    MaterialModule,
    ComponentsModule
  ],
  exports: [
    LocalizationModule,
    LocaleValidationModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalStorageModule,
    BsDatepickerModule,
    NouisliderModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [],
  providers: [
    AppStateService,
    CommonService
  ]
})
export class SharedModule {
}
