import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { L10nModule } from '@photobook/l10n';
import { UiKitModule } from '@photobook/ui-kit';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AuthPageRoutingModule,
    L10nModule,
    UiKitModule
  ],
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent]
})
export class AuthPageModule { }
