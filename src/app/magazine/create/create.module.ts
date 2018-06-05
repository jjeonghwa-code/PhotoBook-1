import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { CreateRoutingModule } from './create-routing.module';
import { Step1PhotosComponent } from './step-1-photos/step-1-photos.component';
import { Step2CoverComponent } from './step-2-cover/step-2-cover.component';
import { Step3StyleComponent } from './step-3-style/step-3-style.component';
import { Step4LayoutComponent } from './step-4-layout/step-4-layout.component';
import { Step5PreviewComponent } from './step-5-preview/step-5-preview.component';
import { Step6OrderComponent } from './step-6-order/step-6-order.component';
import { PhotoEditorModalComponent } from './step-1-photos/photo-editor-modal/photo-editor-modal.component';
import { PesdkReactuiComponent } from './step-1-photos/pesdk-reactui/pesdk-reactui.component';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    SharedModule
  ],
  declarations: [
    Step1PhotosComponent,
    Step2CoverComponent,
    Step3StyleComponent,
    Step4LayoutComponent,
    Step5PreviewComponent,
    Step6OrderComponent,
    PhotoEditorModalComponent,
    PesdkReactuiComponent
  ],
  entryComponents: [
    PhotoEditorModalComponent
  ]
})
export class CreateModule { }
