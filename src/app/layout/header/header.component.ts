import { Component, OnInit } from '@angular/core';
import { UserService } from '@photobook/core/services/user.service';
import { StateService } from '@photobook/state-service';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { Router } from '@angular/router';

@Component({
  selector: 'pb-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Language() lang: string;

  auth$ = this.stateService.isLoggedIn$;

  constructor(
    private stateService: StateService,
    private router: Router,
    public locale: LocaleService
  ) { }

  ngOnInit() {
  }

  logout() {
    this.stateService.clear();
    this.router.navigate(['/login']);
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
