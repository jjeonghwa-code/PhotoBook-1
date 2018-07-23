import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from '../../../layout/layout.module';

import { EditRoutingModule } from './edit-routing.module';
import { EditComponent } from './edit.component';

@NgModule({
  imports: [
    CommonModule,
    EditRoutingModule,
    LayoutModule
  ],
  declarations: [EditComponent]
})
export class EditModule { }
