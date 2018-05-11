import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

const routes: Routes = [
  // { path: 'search-list', component: SearchListComponent, pathMatch: 'full' },
  // { path: '', component: SearchListComponent, pathMatch: 'full' },
  // { path: '**', redirectTo: 'search-list' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
