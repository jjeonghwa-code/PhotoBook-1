import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MagazineComponent } from './magazine.component';
import { CreateModule } from './create/create.module';

const routes: Routes = [
  {
    path: '',
    component: MagazineComponent,
    children: [
      { path: 'create', loadChildren: './create/create.module#CreateModule' },
      { path: '', redirectTo: 'create' },
      { path: '**', redirectTo: 'create' }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MagazineRoutingModule { }
