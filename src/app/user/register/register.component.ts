import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { CommonService, UserService } from '../../shared/services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Language() lang: string;
  loginForm: FormGroup;
  loginFormErrors: any;
  loginErrorMessage: string;
  newsletter: boolean;

  constructor(
    private commonService: CommonService,
    private useService: UserService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginFormErrors = {
      firstName: {},
      lastName: {},
      email: {},
      emailRepeat: {},
      password: {},
      passwordRepeat: {}
    };

    this.loginForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailRepeat: ['', Validators.required, Validators.email],
      password: ['', Validators.required],
      passwordRepeat: ['', Validators.required],
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

  register() {
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    if (email === 'someone@example.com' && password === 'password') {
      this.useService.signedIn = true;
      this.router.navigate(['pages']);
    } else {
      this.loginErrorMessage = 'There is an error!';
      setTimeout(() => {
        this.loginErrorMessage = '';
      }, 2000);
    }
  }

  get loginSubTitle2(): string {
    return this.commonService.translateTemplate('REGISTER_FORM_SUBTITLE_P2', {});
  }
}
