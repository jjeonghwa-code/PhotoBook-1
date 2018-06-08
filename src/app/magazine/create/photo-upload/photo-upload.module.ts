import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { PhotoUploadService } from './services/photo-upload.service';

import { SharedModule } from '../../../shared/shared.module';

import { PhotoUploadComponent } from './photo-upload.component';
import { InfoBoxComponent } from './elements/info-box/info-box.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedModule
  ],
  exports: [
    PhotoUploadComponent
  ],
  declarations: [
    PhotoUploadComponent,
    InfoBoxComponent,
  ],
  providers: [
    PhotoUploadService
  ]
})
export class PhotoUploadModule { }
