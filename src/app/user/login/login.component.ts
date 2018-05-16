import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { CommonService, UserService } from '../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Language() lang: string;
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private router: Router,
    private _notifications: NotificationsService,
    private commonService: CommonService,
    private useService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
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
    const credentials = { 
      email: this.loginForm.get('email').value,
      password: this.loginForm.get('password').value
    };
    this.useService.login(credentials)
      .subscribe((res) => {
        if (parseInt(res.errNum) == 200) {
          // storageService.setUserInfo(res);
          // filesService.user = res;
          return this.router.navigate(['magazine/create/step/1']);
        }

        this._notifications.error(res.errMsg, null, {
          clickToClose: true,
          timeOut: 2000
        });
      },(err) => {
          this._notifications.error('Wrong password or email!', null, {
            clickToClose: true,
            timeOut: 2000
          });         
        }
      );
  }

  get loginSubTitleP2(): string {
    return this.commonService.translateTemplate('LOGIN_SUBTITLE_P2', {});
  }
}
