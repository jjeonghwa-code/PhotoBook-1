import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { catchError, finalize, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs/internal/observable/of';
import { CoverStateService } from '../cover-step/services/cover-state.service';
import { StateService } from '@photobook/state-service';
import { MagazineService } from '@photobook/core/services/magazine.service';
import { FileService } from '@photobook/core/services/file.service';
import { UploadWarningModalComponent } from './components/upload-warning-modal/upload-warning-modal.component';

declare var createMagazineWithJSON: any;

@Component({
  selector: 'pb-order-step',
  templateUrl: './order-step.component.html',
  styleUrls: ['./order-step.component.scss']
})
export class OrderStepComponent implements OnInit {
  userInfo;
  pendingWindow;

  constructor(
    private matDialog: MatDialog,
    public coverStateService: CoverStateService,
    private stateService: StateService,
    private magazineService: MagazineService,
    private fileService: FileService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userInfo = this.stateService.userInfo;
  }

  openWarningModal() {
    const dialogRef = this.matDialog.open(UploadWarningModalComponent, {
      // width: '770px',
      panelClass: 'upload-warning-modal',
      data : {
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        this.orderAndPay();
      }
    });
  }

  orderAndPay() {
    this.pendingWindow = window.open('https://ota.onsfotoboek.nl/psp/pages/pending', '_blank');
    this.magazineService.uploadMagazine()
      .pipe(
        tap((res: any) => {
          if (parseInt(res.errNum, 10) === 200) {
            const promise = new Promise((resolve, reject) => {
              createMagazineWithJSON(JSON.stringify(this.stateService.currentMagazine), resolve, reject);
            }).then((data: any) => {
              const blobUrl = data.url;

              const oReq = new XMLHttpRequest();
              oReq.open('GET', blobUrl, true);
              oReq.responseType = 'blob';

              oReq.onload = (oEvent) => {
                const blob = oReq.response;

                this.fileService.uploadPDF(res.upl_id, 'preview.pdf', blob)
                  .pipe(
                    tap((uploadPDFData: any) => {
                      this.stateService.clear();
                      this.router.navigate(['/magazines/upload-success']);
                    }),
                    catchError(e => of(e)),
                    finalize(() => {
                      this.router.navigate(['/magazines']);
                    })
                  )
                  .subscribe(event => {

                  });
              };
              oReq.send(null);
            })
            .catch((err) => {
              console.log(err);
              console.log('Generation of the magazine from JSON failed');
              this.router.navigate(['/magazines']);
            });

            this.magazineService.uploadComplete()
              .pipe(
                tap((x: any) => {
                  console.log('PAYMENT URL!!!', x, res.payment_url);
                  this.pendingWindow = window.open(res.payment_url, '_blank');
                }),
                catchError(e => of(e)),
                finalize(() => {
                })
              )
              .subscribe(event => {

              });
          } else {
            this.pendingWindow.close();
            this.router.navigate(['/magazine/create/step/6']);
          }
        }),
        catchError(e => of(e)),
        finalize(() => {
          this.pendingWindow.close();
          this.router.navigate(['/magazine/create/step/6']);
        })
      )
      .subscribe(event => {

      });
  }

  prevStep() {
    this.router.navigate(['/magazine/create/step5']);
  }

}
