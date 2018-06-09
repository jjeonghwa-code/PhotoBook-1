import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@photobook/core/services/user.service';
import { CommonService } from '@photobook/common-service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { StateService } from '@photobook/state-service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  @Language() lang: string;
  isLoading = false;
  loginForm: FormGroup;
  loginFormErrors: any;

  auth$: Subscription = new Subscription();

  constructor(
    private _notifications: NotificationsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private stateService: StateService,
    private commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth$ = this.stateService.isLoggedIn$.subscribe(flag => {
      if (flag) {
        this.router.navigate(['/magazine/create/step1']);
      }
    });

    this.loginFormErrors = {
      email: {},
      password: {}
    };

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.formValuesChanged();
    this.loginForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  ngOnDestroy() {
    this.auth$.unsubscribe();
  }

  formValuesChanged() {
    for (const field in this.loginFormErrors) {
      if (this.loginFormErrors.hasOwnProperty(field)) {
        this.loginFormErrors[field] = {};

        const control = this.loginForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.loginFormErrors[field] = control.errors;
        }
      }
    }
  }

  login() {
    this.isLoading = true;
    this.userService.login(this.loginForm.value)
      .pipe(
        tap((x: any) => {
          if (parseInt(x.errNum, 10) === 200) {
            this.router.navigate(['/magazine/create/step1']);
          } else {
            this._notifications.error(x.errMsg, null, {
              clickToClose: true,
              timeOut: 2000
            });
          }
        }),
        catchError((e) => of('Login failed')),
        finalize(() => this.isLoading = false)
      )
      .subscribe(message => {
        // nothing
      });
  }

  get loginSubTitleP2(): string {
    return this.commonService.translateTemplate('LOGIN_SUBTITLE_P2', {});
  }
}
