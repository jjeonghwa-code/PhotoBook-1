import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    if (email === 'someone@example.com' && password === 'password') {
      this.useService.signedIn = true;
      this.router.navigate(['pages']);
    } else {

    }
  }
}
