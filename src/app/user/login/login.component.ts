import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  loginErrorMessage: string;

  constructor(
    private commonService: CommonService,
    private useService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
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
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    if (email === 'someone@example.com' && password === 'password') {
      this.useService.signedIn = true;
      this.router.navigate(['pages']);
    } else {
      this.loginErrorMessage = 'Wrong password or email!';
      setTimeout(() => {
        this.loginErrorMessage = '';
      }, 2000);
    }
  }

  get loginSubTitleP2(): string {
    return this.commonService.translateTemplate('LOGIN_SUBTITLE_P2', {});
  }
}
