import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@photobook/material';

import { OrderStepRoutingModule } from './order-step-routing.module';
import { OrderStepComponent } from './order-step.component';
import { OrderFooterBarComponent } from './components/order-footer-bar/order-footer-bar.component';
import { UploadWarningModalComponent } from './components/upload-warning-modal/upload-warning-modal.component';
import { UploadSuccessModalComponent } from './components/upload-success-modal/upload-success-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    L10nModule,
    UiKitModule,
    OrderStepRoutingModule
  ],
  declarations: [OrderStepComponent, OrderFooterBarComponent, UploadWarningModalComponent, UploadSuccessModalComponent],
  entryComponents: [UploadWarningModalComponent, UploadSuccessModalComponent]
})
export class OrderStepModule { }
