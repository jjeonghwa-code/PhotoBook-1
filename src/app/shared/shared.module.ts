import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NouisliderModule } from 'ng2-nouislider';
import { MaterialModule } from './material/material.module';
import { DragulaModule } from 'ng2-dragula';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NguiReactModule } from '@ngui/react';
import { BsDatepickerModule } from 'ngx-bootstrap';
import {
  LocalizationModule,
  LocaleValidationModule
} from 'angular-l10n';
import { ComponentsModule } from './components/components.module';

import {
  AppStateService,
  CommonService,
  FilesService
} from '../shared/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalStorageModule.withConfig({
      storageType: 'localStorage'
    }),
    LocalizationModule,
    LocaleValidationModule,
    BsDatepickerModule.forRoot(),
    NouisliderModule,
    MaterialModule,
    DragulaModule,
    ImageCropperModule,
    NguiReactModule,
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
    DragulaModule,
    ImageCropperModule,
    NguiReactModule,
    ComponentsModule
  ],
  declarations: [],
  providers: [
    AppStateService,
    CommonService,
    FilesService
  ]
})
export class SharedModule {
}
