import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';

@NgModule({
  imports: [
    CommonModule,
    L10nModule,
    HomePageRoutingModule,
  ],
  declarations: [HomePageComponent]
})
export class HomePageModule { }
