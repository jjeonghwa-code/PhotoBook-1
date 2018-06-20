import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@photobook/material';

import { CoverStepRoutingModule } from './cover-step-routing.module';
import { CoverStepComponent } from './cover-step.component';
import { CoverPositionSelectorComponent } from './components/cover-position-selector/cover-position-selector.component';
import { CoverStateService } from './services/cover-state.service';
import { CoverPhotoSelectModalComponent } from './components/cover-photo-select-modal/cover-photo-select-modal.component';
import { CoverFooterBarComponent } from './components/cover-footer-bar/cover-footer-bar.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CoverStepRoutingModule,
    MaterialModule,
    L10nModule,
    UiKitModule,
  ],
  declarations: [
    CoverStepComponent,
    CoverPositionSelectorComponent,
    CoverPhotoSelectModalComponent,
    CoverFooterBarComponent
  ],
  providers: [
    CoverStateService
  ],
  entryComponents: [
    CoverPhotoSelectModalComponent
  ]
})
export class CoverStepModule { }
