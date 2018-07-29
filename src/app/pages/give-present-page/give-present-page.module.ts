import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '@photobook/ui-kit';

import { MagazineService } from '@photobook/core/services/magazine.service';

import { GivePresentPageRoutingModule } from './give-present-page-routing.module';
import { GivePresentPageComponent } from './give-present-page.component';

@NgModule({
  imports: [
    CommonModule,
    L10nModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UiKitModule,
    GivePresentPageRoutingModule
  ],
  declarations: [GivePresentPageComponent],
  providers: [
    MagazineService
  ]
})
export class GivePresentPageModule { }
