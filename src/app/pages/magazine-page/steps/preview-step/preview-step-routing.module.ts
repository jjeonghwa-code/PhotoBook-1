import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreviewStepComponent } from './preview-step.component';

const routes: Routes = [
  {path: '', component: PreviewStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewStepRoutingModule { }
