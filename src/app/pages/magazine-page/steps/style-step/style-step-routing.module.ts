import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StyleStepComponent } from './style-step.component';

const routes: Routes = [
  {path: '', component: StyleStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StyleStepRoutingModule { }
