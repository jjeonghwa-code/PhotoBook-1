import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Language() lang: string;
  @Input() isOnboarding: boolean;

  constructor(
    private router: Router,
    public locale: LocaleService,
    public translationService: TranslationService
  ) {
    router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        if (evt.url.includes('/home')) {

        } else {

        }
      }
    });
   }

  ngOnInit() {

  }

  switchLanguage() {
    if (this.locale.getCurrentLanguage() === 'en') {
      this.locale.setDefaultLocale('nl', 'NL');
      this.locale.setCurrentCurrency('EURO');
    } else if (this.locale.getCurrentLanguage() === 'nl') {
      this.locale.setDefaultLocale('en', 'US');
      this.locale.setCurrentCurrency('USD');
    }
  }
}
