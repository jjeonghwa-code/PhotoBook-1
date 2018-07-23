import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiKitModule } from '@photobook/ui-kit';
import { AccountDetailsComponent } from './account-details/account-details.component';
import { MaterialModule } from '@photobook/material';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    L10nModule,
    FormsModule,
    ReactiveFormsModule,
    UiKitModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    AccountDetailsComponent
  ],
  declarations: [
    HeaderComponent,
    AccountDetailsComponent
  ]
})
export class LayoutModule { }
