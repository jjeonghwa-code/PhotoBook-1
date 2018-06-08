import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutStepComponent } from './layout-step.component';

const routes: Routes = [
  {path: '', component: LayoutStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutStepRoutingModule { }
