import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MagazinePageRoutingModule } from './magazine-page-routing.module';
import { MagazinePageComponent } from './magazine-page.component';
import { StepNavigationComponent } from './components/step-navigation/step-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    MagazinePageRoutingModule
  ],
  declarations: [MagazinePageComponent, StepNavigationComponent]
})
export class MagazinePageModule { }
