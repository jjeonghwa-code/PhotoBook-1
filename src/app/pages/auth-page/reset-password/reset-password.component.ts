import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { CommonService } from '@photobook/common-service';
import { catchError, finalize, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { NotificationsService } from 'angular2-notifications';
import { LocaleService, TranslationService, Language } from 'angular-l10n';

@Component({
  selector: 'pb-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Language() lang: string;

  isLoading = false;
  resetForm: FormGroup;
  resetFormErrors: any;

  constructor(
    private _notifications: NotificationsService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetFormErrors = {
      email: {}
    };

    this.resetForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.formValuesChanged();
    this.resetForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });
  }

  formValuesChanged() {
    for (const field in this.resetFormErrors) {
      if (this.resetFormErrors.hasOwnProperty(field)) {
        this.resetFormErrors[field] = {};

        const control = this.resetForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.resetFormErrors[field] = control.errors;
        }
      }
    }
  }

  reset() {
    this.isLoading = true;
    this.userService.resetPassword(this.resetForm.value)
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.router.navigate(['/login']);
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

}
