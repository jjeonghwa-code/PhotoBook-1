import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocalStorageModule } from 'angular-2-local-storage';
import { NouisliderModule } from 'ng2-nouislider';
import { MaterialModule } from './material/material.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ComponentsModule } from './components/components.module';
import {
  L10nConfig,
  L10nLoader,
  LocalizationModule,
  LocaleValidationModule,
  StorageStrategy,
  ProviderType
} from 'angular-l10n';
const l10nConfig: L10nConfig = {
  locale: {
    languages: [
      { code: 'en', dir: 'ltr' },
      { code: 'nl', dir: 'ltr' }
    ],
    defaultLocale: { languageCode: 'nl', countryCode: 'NL' },
    currency: 'EUR',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: '/assets/locale-' }
    ],
    composedKeySeparator: '.',
    i18nPlural: true
  }
};

import { AppStateService, CommonService } from '../shared/services';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LocalizationModule.forRoot(l10nConfig),
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
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
