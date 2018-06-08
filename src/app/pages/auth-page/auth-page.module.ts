import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthPageRoutingModule } from './auth-page-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    AuthPageRoutingModule
  ],
  declarations: [LoginComponent, RegisterComponent, ResetPasswordComponent]
})
export class AuthPageModule { }
