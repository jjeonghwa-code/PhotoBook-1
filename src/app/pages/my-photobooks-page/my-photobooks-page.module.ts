import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';
import { RouterModule } from '@angular/router';
import { ClipboardModule } from 'ngx-clipboard';
import { UiKitModule } from '@photobook/ui-kit';

import { MagazineService } from '@photobook/core/services/magazine.service';

import { MyPhotobooksPageRoutingModule } from './my-photobooks-page-routing.module';
import { MyPhotobooksPageComponent } from './my-photobooks-page.component';
import { StatusDeliveryComponent } from './status-delivery/status-delivery.component';

@NgModule({
  imports: [
    CommonModule,
    L10nModule,
    RouterModule,
    ClipboardModule,
    UiKitModule,
    MyPhotobooksPageRoutingModule
  ],
  declarations: [MyPhotobooksPageComponent, StatusDeliveryComponent],
  providers: [
    MagazineService
  ]
})
export class MyPhotobooksPageModule { }
