import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { LocaleService, TranslationService, Language } from 'angular-l10n';
import { CommonService } from '@photobook/common-service';
import { MagazineService } from '@photobook/core/services/magazine.service';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { NotificationsService } from 'angular2-notifications';

@Component({
  selector: 'pb-my-photobooks-page',
  templateUrl: './my-photobooks-page.component.html',
  styleUrls: ['./my-photobooks-page.component.scss']
})
export class MyPhotobooksPageComponent implements OnInit {
  @Language() lang: string;
  order_extra_costs = 8.95;

  constructor(
    private _notifications: NotificationsService,
    private router: Router,
    private route: ActivatedRoute,
    public locale: LocaleService,
    public commonService: CommonService,
    public magazineService: MagazineService
  ) { }

  ngOnInit() {
    this.getUploads();
  }

  getUploads() {
    this.magazineService.getUploads()
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            console.log(123123123, res);
            this.magazineService.magazines = res.upl_list;
            this.order_extra_costs = parseFloat(res.priceExtra.replace(/,/, '.'));
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

  copiedToClipboardAlert() {
    this._notifications.html(`Copied to clipboard!`, 'success', {
      clickToClose: true,
      pauseOnHover: true,
      showProgressBar: false,
      timeOut: 2000,
      position: ['middle', 'center']
    });
  }

  showOrderPhotobook(mag) {
    return mag.upl_status.every((status) => +status.upl_status < 2);
  }

  get mailToStr1(): string {
    return 'mailto:?subject=' + this.commonService.translateTemplate('LIST_TITLE', {});
  }

  get mailToStr2(): string {
    return '&body=' + this.commonService.translateTemplate('LIST_ORDER_INVITE_MAIL_BODY', {}) + ': ';
  }
}
