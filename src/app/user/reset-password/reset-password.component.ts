import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { CommonService, UserService } from '../../shared/services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Language() lang: string;
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private _notifications: NotificationsService,
    private commonService: CommonService,
    private useService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginFormErrors = {
      email: {}
    };

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
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

  sendPassword() {
    const credentials = { 
      email: this.loginForm.get('email').value
    };
    this.useService.resetPassword(credentials)
      .subscribe((res) => {
        if (parseInt(res.errNum) == 200) {
          return this.router.navigate(['login']);
        }

        this._notifications.error(res.errMsg, null, {
          clickToClose: true,
          timeOut: 2000
        });
      },(err) => {
          this._notifications.error('Something went wrong!', null, {
            clickToClose: true,
            timeOut: 2000
          });         
        }
      );
  }
}
