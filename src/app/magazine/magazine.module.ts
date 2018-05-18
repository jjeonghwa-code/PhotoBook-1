import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { MagazineRoutingModule } from './magazine-routing.module';
import { MagazineComponent } from './magazine.component';
import { StepsNavigationComponent } from './steps-navigation/steps-navigation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MagazineRoutingModule
  ],
  declarations: [MagazineComponent, StepsNavigationComponent]
})
export class MagazineModule { }
