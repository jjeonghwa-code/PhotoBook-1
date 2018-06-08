import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderStepRoutingModule } from './order-step-routing.module';
import { OrderStepComponent } from './order-step.component';

@NgModule({
  imports: [
    CommonModule,
    OrderStepRoutingModule
  ],
  declarations: [OrderStepComponent]
})
export class OrderStepModule { }
