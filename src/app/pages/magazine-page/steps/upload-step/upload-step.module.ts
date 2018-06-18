import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { DragulaModule } from 'ng2-dragula';

import { UploadStateService } from './services/upload-state.service';

import { UploadStepRoutingModule } from './upload-step-routing.module';
import { UploadStepComponent } from './upload-step.component';
import { InfoBoxComponent } from './components/info-box/info-box.component';
import { DeleteConfirmModalComponent } from './components/delete-confirm-modal/delete-confirm-modal.component';
import { PhotoEditModalComponent } from './components/photo-edit-modal/photo-edit-modal.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@photobook/material';
import { PhotoMoodInputComponent } from './components/photo-mood-input/photo-mood-input.component';
import { ColorSliderComponent } from './components/color-slider/color-slider.component';
import { FooterBarComponent } from './components/footer-bar/footer-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UploadStepRoutingModule,
    FlexLayoutModule,
    MaterialModule,
    L10nModule,
    UiKitModule,
    DragulaModule,
    ImageCropperModule,
    PopoverModule.forRoot()
  ],
  declarations: [
    UploadStepComponent,
    InfoBoxComponent,
    DeleteConfirmModalComponent,
    PhotoEditModalComponent,
    PhotoMoodInputComponent,
    ColorSliderComponent,
    FooterBarComponent
  ],
  providers: [
    UploadStateService
  ],
  entryComponents: [
    DeleteConfirmModalComponent,
    PhotoEditModalComponent
  ]
})
export class UploadStepModule { }
