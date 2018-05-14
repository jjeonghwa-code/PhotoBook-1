import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
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
    currency: 'EURO',
    storage: StorageStrategy.Cookie
  },
  translation: {
    providers: [
      { type: ProviderType.Static, prefix: '/assets/locale-' }
    ],
    caching: true,
    missingValue: 'No key',
    composedKeySeparator: '.',
    i18nPlural: true
  }
};

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    LocalizationModule.forRoot(l10nConfig),
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    LocalizationModule,
    LocaleValidationModule,
    BsDatepickerModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ]
})
export class ComponentsModule { }
