import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L10nModule } from '@photobook/l10n';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    CommonModule,
    L10nModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [
    HeaderComponent
  ]
})
export class LayoutModule { }
