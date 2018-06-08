import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptorService } from '@photobook/core/interceptors/http.interceptor';
import { LocalStorageModule } from 'angular-2-local-storage';

import { StateService } from '@photobook/state-service';
import { CommonService } from '@photobook/common-service';
import { UserService } from '@photobook/core/services/user.service';
import { AuthGuard } from '@photobook/core/guards/auth.guard';

import { LayoutModule } from './layout/layout.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// localization module
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
    composedKeySeparator: '.',
    i18nPlural: true
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    LayoutModule,
    LocalStorageModule.withConfig({storageType: 'localStorage', prefix: 'PHOTOBOOK'}),
    LocalizationModule.forRoot(l10nConfig),
    LocaleValidationModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true},
    StateService,
    CommonService,
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public l10nLoader: L10nLoader) {
    this.l10nLoader.load();
  }
}
