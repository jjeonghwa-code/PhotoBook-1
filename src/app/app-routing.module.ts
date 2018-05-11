import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', loadChildren: './home/home.module#HomeModule' },
      { path: '', loadChildren: './pages/pages.module#PagesModule', canActivate: [AuthGuard] },
      // { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
