import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NouisliderModule } from 'ng2-nouislider';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import {
  LocalizationModule,
  LocaleValidationModule
} from 'angular-l10n';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    LocalizationModule,
    LocaleValidationModule,
    BsDatepickerModule.forRoot()
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    LoadingComponent,
    ConfirmDialogComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    NouisliderModule,
    LocalizationModule,
    LocaleValidationModule,
    BsDatepickerModule,
    HeaderComponent,
    FooterComponent,
    LoadingComponent
  ],
  entryComponents: [
    ConfirmDialogComponent
  ]
})
export class ComponentsModule { }
