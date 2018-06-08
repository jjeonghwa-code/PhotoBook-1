import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@photobook/core/services/user.service';
import { CommonService } from '@photobook/common-service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'pb-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Language() lang: string;
  isLoading = false;
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private commonService: CommonService,
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
    this.isLoading = true;
    this.userService.login(this.loginForm.value)
      .pipe(
        tap((x: any) => {
          if (parseInt(x.errNum, 10) === 200) {
            this.router.navigate(['/magazine/create/step1']);
          } else {
            // TODO: error
            console.log(x);
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
