import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CoverStepComponent } from './cover-step.component';

const routes: Routes = [
  {path: '', component: CoverStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoverStepRoutingModule { }
