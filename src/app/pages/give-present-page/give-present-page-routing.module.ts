import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GivePresentPageComponent } from './give-present-page.component';

const routes: Routes = [
  {path: '', component: GivePresentPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GivePresentPageRoutingModule { }
