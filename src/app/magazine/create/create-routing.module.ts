import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhotoUploadComponent } from './photo-upload/photo-upload.component';

import { Step1PhotosComponent } from './step-1-photos/step-1-photos.component';
import { Step2CoverComponent } from './step-2-cover/step-2-cover.component';
import { Step3StyleComponent } from './step-3-style/step-3-style.component';
import { Step4LayoutComponent } from './step-4-layout/step-4-layout.component';
import { Step5PreviewComponent } from './step-5-preview/step-5-preview.component';
import { Step6OrderComponent } from './step-6-order/step-6-order.component';

const routes: Routes = [
  { path: 'step1', pathMatch: 'full', component: Step1PhotosComponent },
  { path: 'step1-1', pathMatch: 'full', component: PhotoUploadComponent },
  { path: 'step2', pathMatch: 'full', component: Step2CoverComponent },
  { path: 'step3', pathMatch: 'full', component: Step3StyleComponent },
  { path: 'step4', pathMatch: 'full', component: Step4LayoutComponent },
  { path: 'step5', pathMatch: 'full', component: Step5PreviewComponent },
  { path: 'step6', pathMatch: 'full', component: Step6OrderComponent },
  { path: '', redirectTo: 'step1', pathMatch: 'full' },
  { path: '**', redirectTo: 'step1' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
