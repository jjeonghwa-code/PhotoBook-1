import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyPhotobooksPageComponent } from './my-photobooks-page.component';

const routes: Routes = [
  {path: '', component: MyPhotobooksPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyPhotobooksPageRoutingModule { }
