import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '@photobook/core/services/user.service';
import { StateService } from '@photobook/state-service';
import { MagazineService } from '@photobook/core/services/magazine.service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'pb-give-present-page',
  templateUrl: './give-present-page.component.html',
  styleUrls: ['./give-present-page.component.scss']
})
export class GivePresentPageComponent implements OnInit {
  @Language() lang: string;
  userInfo;
  order_extra_amount = 1;
  order_extra_costs = 8.95;
  order_extra_payment_url = '';
  currentUpload;
  order_id: string;
  addGiftPopup;
  user_gift = {followId: false};

  isLoading = false;
  accountDetailForm: FormGroup;
  accountDetailFormErrors: any;

  constructor(
    private _notifications: NotificationsService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    public locale: LocaleService,
    private stateService: StateService,
    private magazineService: MagazineService
  ) {
    this.route.params.subscribe((param) => {
      this.order_id = param.order_id;
    });
  }

  ngOnInit() {
    this.accountDetailFormErrors = {
      firstName: {},
      lastName: {},
      street: {},
      houseNumber: {},
      postalCode: {},
      city: {}
    };

    this.accountDetailForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      street: ['', Validators.required],
      houseNumber: ['', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]],
      houseNumberSuffix: [''],
      postalCode: ['', [Validators.required, Validators.pattern(/^[0-9]{4}\s?[A-Za-z]{2}$/)]],
      city: ['', Validators.required]
    });

    this.formValuesChanged();
    this.accountDetailForm.valueChanges.subscribe(() => {
      this.formValuesChanged();
    });

    this.userInfo = this.stateService.userInfo;
    console.log(321321, this.userInfo);
    this.getUploads();
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

  getUploads() {
    this.magazineService.getUploads()
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            console.log(123123123, res);
            this.magazineService.magazines = res.upl_list;
            this.order_extra_costs = parseFloat(res.priceExtra.replace(/,/, '.'));

            // If we are looking at a magazine detail page, get it from the upload list.
            if (this.order_id) {
              this.magazineService.magazines.forEach((magazine) => {
                if (magazine.upl_id === this.order_id) {
                  this.currentUpload = magazine;
                  console.log(123, this.currentUpload);
                  if (magazine.upl_priceExtra) {
                    this.order_extra_costs = parseFloat(magazine.upl_priceExtra.replace(/,/, '.'));
                  }
                }
              });
            }
          } else {
            this._notifications.error(res.errMsg, null, {
              clickToClose: true,
              timeOut: 2000
            });
          }
        }),
        catchError(e => of(e))
      )
      .subscribe(event => {

      });
  }

  sendGift() {
    if (!this.addGiftPopup) {
      this.addGiftPopup = window.open('https://ota.onsfotoboek.nl/psp/pages/pendingGift', '_blank');
    }

    const data = {
      use_guid: this.userInfo.use_guid,
      upl_id: this.order_id,
      followId: this.user_gift.followId
    };

    this.magazineService.addGift(data)
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            this.addGiftPopup.location = res.payment_url;
          } else {

          }
        }),
        catchError(e => of(e)),
        finalize(() => {
          this.addGiftPopup.close();
          this.router.navigate(['/magazines']);
        })
      )
      .subscribe(event => {

      });
  }

  addGift() {
    if (!this.addGiftPopup) {
      this.addGiftPopup = window.open('https://ota.onsfotoboek.nl/psp/pages/pendingGift', '_blank');
    }

    if (this.user_gift.followId !== false) {
      // User exists, so add the gift directly.
      this.sendGift();
    } else {
      const data = {
        use_firstname: this.accountDetailForm.get('firstName').value,
        use_lastname: this.accountDetailForm.get('lastName').value,
        use_street: this.accountDetailForm.get('street').value,
        use_housenumber: this.accountDetailForm.get('houseNumber').value,
        use_housenumbersuffix: this.accountDetailForm.get('houseNumberSuffix').value || '',
        use_postalcode: this.accountDetailForm.get('postalCode').value,
        use_city: this.accountDetailForm.get('city').value,
        use_language: 'NL',
        use_countryId: this.userInfo.use_countryId,
      };
      console.log(333333, data);

      this.magazineService.signUpGift(data)
        .pipe(
          tap((res: any) => {
            this.user_gift.followId = res.followId;
            console.log(55555, this.user_gift.followId);
            this.sendGift();
          }),
          catchError(e => of(e)),
          finalize(() => this.addGiftPopup.close())
        )
        .subscribe(event => {

        });
    }
  }
}
