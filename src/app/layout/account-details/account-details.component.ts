import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { CommonService } from '@photobook/common-service';
import { StateService } from '@photobook/state-service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'pb-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountDetailsComponent implements OnInit {
  @Language() lang: string;
  userInfo;
  selectedSubscription = 1;
  subscriptionList = [];
  selected_subscription = {};

  isLoading = false;
  accountDetailForm: FormGroup;
  accountDetailFormErrors: any;

  constructor(
    private _notifications: NotificationsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private commonService: CommonService,
    public locale: LocaleService,
    private stateService: StateService
  ) { }

  async ngOnInit() {
    this.accountDetailFormErrors = {
      firstName: {},
      lastName: {},
      email: {},
      password: {},
      passwordRepeat: {},
      postalCode: {},
      houseNumber: {},
      street: {},
      city: {},
      birthDate: {},
      phone: {},
      newsletter: {}
    };

    this.accountDetailForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordRepeat: ['', [Validators.required, confirmPassword]],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}\s?[A-Za-z]{2}$/)]],
      houseNumber: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      houseNumberSuffix: [''],
      street: ['', Validators.required],
      city: ['', Validators.required],
      birthDate: ['', Validators.required],
      phone: ['', Validators.required],
      newsletter: ['', Validators.required]
    });

    this.formValuesChanged();
    this.accountDetailForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });

    try {
      await this.getUserDetails();
    } catch (e) {}
    try {
      await this.getSubscriptionList();
    } catch (e) {}
    this.fetchUserInfo();
  }

  formValuesChanged() {
    for (const field in this.accountDetailFormErrors) {
      if (this.accountDetailFormErrors.hasOwnProperty(field)) {
        this.accountDetailFormErrors[field] = {};

        const control = this.accountDetailForm.get(field);

        if (control && control.dirty && !control.valid) {
          this.accountDetailFormErrors[field] = control.errors;
        }
      }
    }
  }

  fetchUserInfo() {
    this.userInfo = this.stateService.userInfo;

    this.accountDetailForm.patchValue({
      firstName: this.userInfo.use_firstname,
      lastName: this.userInfo.use_lastname,
      email: this.userInfo.use_email,
      postalCode: this.userInfo.use_postalcode,
      houseNumber: this.userInfo.use_housenumber,
      houseNumberSuffix: this.userInfo.use_housenumbersuffix,
      street: this.userInfo.use_street,
      city: this.userInfo.use_city,
      birthDate: new Date(this.userInfo.use_dateofbirth),
      phone: this.userInfo.use_phonenumber,
      newsletter: this.userInfo.use_newsletter
    });
  }

  getUserDetails() {
    return this.userService.getUserDetails()
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            console.log(123123123, res);
            this.setSelectedSubscription();
          } else {
            this._notifications.error(res.errMsg, null, {
              clickToClose: true,
              timeOut: 2000
            });
          }
        }),
        catchError(e => of(e))
      )
      .toPromise();
  }

  getSubscriptionList() {
    return this.userService.getSubscriptionList()
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.subscriptionList = res.subscriptionList;
            this.setSelectedSubscription();
          } else {
            this._notifications.error(res.errMsg, null, {
              clickToClose: true,
              timeOut: 2000
            });
          }
        }),
        catchError(e => of(e))
      )
      .toPromise();
  }

  setSelectedSubscription() {
    this.subscriptionList.forEach((i) => {
      if (i.subscriptionId === this.userInfo.sub_id) {
        this.selected_subscription = i;
      }
    });
  }

  convertDate() {
    const birthDate = this.accountDetailForm.get('birthDate').value;
    console.log(123123, birthDate);
    return [birthDate.getFullYear(), birthDate.getMonth() + 1, birthDate.getDate()].join('-');
  }

  saveProfile() {
    this.isLoading = true;
    const data = {
      use_actiecode: '',
      use_device_info: 'web test',
      use_gender: 0,
      use_guid: this.stateService.userInfo.use_guid,
      use_firstname: this.accountDetailForm.get('firstName').value,
      use_lastname: this.accountDetailForm.get('lastName').value,
      use_email: this.accountDetailForm.get('email').value,
      use_password: this.accountDetailForm.get('password').value,
      use_street: this.accountDetailForm.get('street').value,
      use_housenumber: this.accountDetailForm.get('houseNumber').value,
      use_housenumbersuffix: this.accountDetailForm.get('houseNumberSuffix').value,
      use_dateofbirth: this.convertDate(),
      use_postalcode: this.accountDetailForm.get('postalCode').value,
      use_city: this.accountDetailForm.get('city').value,
      use_countryId: 1,
      use_phonenumber: this.accountDetailForm.get('phone').value,
      use_newsletter: this.accountDetailForm.get('newsletter').value,
    };
    this.userService.updateProfile(data)
      .pipe(
        tap(async (res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            console.log(123123123, data);
            try {
              await this.getUserDetails();
            } catch (e) {}
            try {
              await this.getSubscriptionList();
            } catch (e) {}
            this.router.navigate(['/profile']);
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

      });
  }

  doPostalCodeCheck() {
    this.userService.getAddressInfo(this.accountDetailForm.value)
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            console.log(123123, res.address);
            if (!this.accountDetailForm.get('street').value) {
              this.accountDetailForm.patchValue({
                street: res.address.street,
              });
            }

            if (!this.accountDetailForm.get('city').value) {
              this.accountDetailForm.patchValue({
                city: res.address.city.label,
              });
            }
          }
        }),
        catchError(e => of(e))
      )
      .subscribe(event => {
        // nothing
      });
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

