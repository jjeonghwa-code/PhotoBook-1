import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UiKitModule } from '@photobook/ui-kit';
import { MaterialModule } from '@photobook/material';

import { StyleStepRoutingModule } from './style-step-routing.module';
import { StyleStepComponent } from './style-step.component';
import { BorderSelectorComponent } from './components/border-selector/border-selector.component';
import { BorderThicknessSelectorComponent } from './components/border-thickness-selector/border-thickness-selector.component';
import { PatternSelectorComponent } from './components/pattern-selector/pattern-selector.component';
import { StyleStateService } from './services/style-state.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    UiKitModule,
    StyleStepRoutingModule,
    MaterialModule
  ],
  declarations: [
    StyleStepComponent,
    BorderSelectorComponent,
    BorderThicknessSelectorComponent,
    PatternSelectorComponent
  ],
  providers: [
    StyleStateService
  ]
})
export class StyleStepModule { }
