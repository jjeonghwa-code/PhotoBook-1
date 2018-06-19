import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { L10nModule } from '@photobook/l10n';
import { MagazinePageRoutingModule } from './magazine-page-routing.module';
import { MagazinePageComponent } from './magazine-page.component';
import { StepNavigationComponent } from './components/step-navigation/step-navigation.component';
import { MaterialModule } from '@photobook/material';

@NgModule({
  imports: [
    CommonModule,
    L10nModule,
    MagazinePageRoutingModule,
    MaterialModule
  ],
  declarations: [MagazinePageComponent, StepNavigationComponent]
})
export class MagazinePageModule { }
