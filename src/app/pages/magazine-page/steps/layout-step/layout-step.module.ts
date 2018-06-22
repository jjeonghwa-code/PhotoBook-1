import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutStepRoutingModule } from './layout-step-routing.module';
import { LayoutStepComponent } from './layout-step.component';
import { LayoutStateService } from './services/layout-state.service';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwappableDirective } from './swappable.directive';
import { DroppableDirective } from './droppable.directive';

import { LayoutFooterBarComponent } from './components/layout-footer-bar/layout-footer-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    LayoutStepRoutingModule
  ],
  declarations: [
    LayoutStepComponent, 
    SwappableDirective, 
    DroppableDirective,
    LayoutFooterBarComponent
  ],
  providers: [
    LayoutStateService
  ]
})
export class LayoutStepModule { }
