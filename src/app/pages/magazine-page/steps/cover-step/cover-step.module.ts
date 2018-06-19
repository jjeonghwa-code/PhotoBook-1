import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@photobook/material';

import { CoverStepRoutingModule } from './cover-step-routing.module';
import { CoverStepComponent } from './cover-step.component';
import { CoverPositionSelectorComponent } from './components/cover-position-selector/cover-position-selector.component';
import { CoverStateService } from './services/cover-state.service';
import { CoverPhotoSelectModalComponent } from './components/cover-photo-select-modal/cover-photo-select-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoverStepRoutingModule,
    MaterialModule
  ],
  declarations: [
    CoverStepComponent,
    CoverPositionSelectorComponent,
    CoverPhotoSelectModalComponent
  ],
  providers: [
    CoverStateService
  ],
  entryComponents: [
    CoverPhotoSelectModalComponent
  ]
})
export class CoverStepModule { }
