import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MagazinePageComponent } from './magazine-page.component';

const routes: Routes = [
  {
    path: '',
    component: MagazinePageComponent,
    children: [
      {path: 'step1', loadChildren: './steps/upload-step/upload-step.module#UploadStepModule'},
      {path: 'step2', loadChildren: './steps/cover-step/cover-step.module#CoverStepModule'},
      {path: 'step3', loadChildren: './steps/style-step/style-step.module#StyleStepModule'},
      {path: 'step4', loadChildren: './steps/layout-step/layout-step.module#LayoutStepModule'},
      {path: 'step5', loadChildren: './steps/preview-step/preview-step.module#PreviewStepModule'},
      {path: 'step6', loadChildren: './steps/order-step/order-step.module#OrderStepModule'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazinePageRoutingModule { }
