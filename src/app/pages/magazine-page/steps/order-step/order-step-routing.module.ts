import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderStepComponent } from './order-step.component';

const routes: Routes = [
  {path: '', component: OrderStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderStepRoutingModule { }
