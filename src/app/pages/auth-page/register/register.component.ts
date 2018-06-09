import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { CommonService } from '@photobook/common-service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'pb-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Language() lang: string;

  isLoading = false;
  registerForm: FormGroup;
  registerFormErrors: any;
  newsletter: boolean;

  constructor(
    private _notifications: NotificationsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    public locale: LocaleService
  ) { }

  ngOnInit() {
    this.registerFormErrors = {
      firstName: {},
      lastName: {},
      email: {},
      emailRepeat: {},
      password: {},
      passwordRepeat: {}
    };

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailRepeat: ['', [Validators.required, Validators.email, confirmEmail]],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required, confirmPassword]],
    });

    this.formValuesChanged();
    this.registerForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.registerFormErrors) {
      if (this.registerFormErrors.hasOwnProperty(field)) {
        this.registerFormErrors[field] = {};

        const control = this.registerForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.registerFormErrors[field] = control.errors;
        }
      }
    }
  }

  register() {
    this.isLoading = true;
    const credentials = {
      email: this.registerForm.get('email').value,
      firstName: this.registerForm.get('firstName').value,
      lastName: this.registerForm.get('lastName').value,
      password: this.registerForm.get('password').value,
      pushToken: '',
      profilePic: '',
      // profilePic: (vm.avatar != "public/images/profile_picture_default.jpg") ? vm.avatar.split(',')[1] : '',
      device: '3',
      newsletter: this.newsletter ? 1 : 0,
      language: this.locale.getCurrentLanguage()
    };
    this.registerAndLogin(credentials)
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.router.navigate(['get-started']);
          } else {
            this._notifications.error(res.errMsg, null, {
              clickToClose: true,
              timeOut: 2000
            });
          }
        }),
        catchError(e => of(e)),
        finalize(() => this.isLoading = false)
      )
      .subscribe(event => {
        // nothing
      });
  }

  private registerAndLogin(credentials) {
    return this.userService.register(credentials)
      .pipe(
        switchMap((x: any) => {
          if (parseInt(x.errNum, 10) === 200) {
            return this.userService.login({email: credentials.email, password: credentials.password});
          } else {
            return of(x);
          }
        })
      );
  }

  get loginSubTitle2(): string {
    return this.commonService.translateTemplate('REGISTER_FORM_SUBTITLE_P2', {});
  }
}

function confirmPassword(control: AbstractControl) {
  if ( !control.parent || !control ) {
    return;
  }

  const password = control.parent.get('password');
  const passwordRepeat = control.parent.get('passwordRepeat');

  if ( !password || !passwordRepeat ) {
    return;
  }

  if ( passwordRepeat.value === '' ) {
    return;
  }

  if ( password.value !== passwordRepeat.value ) {
    return {
      passwordsNotMatch: true
    };
  }
}

function confirmEmail(control: AbstractControl) {
  if ( !control.parent || !control ) {
    return;
  }

  const email = control.parent.get('email');
  const emailRepeat = control.parent.get('emailRepeat');

  if ( !email || !emailRepeat ) {
    return;
  }

  if ( emailRepeat.value === '' ) {
    return;
  }

  if ( email.value !== emailRepeat.value ) {
    return {
      emailsNotMatch: true
    };
  }
}
