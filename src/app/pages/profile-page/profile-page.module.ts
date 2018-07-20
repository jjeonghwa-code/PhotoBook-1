import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';

import { ProfilePageRoutingModule } from './profile-page-routing.module';
import { ProfilePageComponent } from './profile-page.component';

@NgModule({
  imports: [
    CommonModule,
    L10nModule,
    ProfilePageRoutingModule
  ],
  declarations: [ProfilePageComponent]
})
export class ProfilePageModule { }
