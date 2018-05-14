import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';

import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  /**
   * This is necessary when we use component specific stylesheets. If you do not
   * have this line, your local styles will not be applied to the view.
   */
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit, OnDestroy {
  @Language() lang: string;
  title = 'app';

  constructor(
    public locale: LocaleService,
    public translationService: TranslationService
  ) { }

  public ngOnInit() {
    console.log('Initializing the app component');

    // this.translationService.translationChanged().subscribe(
    //   () => {
    //     console.log('local chnageed!!');
    //     this.changeDetectorRef.markForCheck();
    //   }
    // );
  }

  public ngOnDestroy() {
    console.log('Destroying the app component');
  }

  toggleLanguage() {
    console.log(33333, this.locale.getCurrentLanguage());
    if (this.locale.getCurrentLanguage() === 'en') {
      this.locale.setDefaultLocale('nl', 'NL');
      this.locale.setCurrentCurrency('EURO');
    } else if (this.locale.getCurrentLanguage() === 'nl') {
      this.locale.setDefaultLocale('en', 'US');
      this.locale.setCurrentCurrency('USD');
    }
  }
}
