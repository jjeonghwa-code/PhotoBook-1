import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadStepComponent } from './upload-step.component';

const routes: Routes = [
  {path: '', component: UploadStepComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadStepRoutingModule { }
