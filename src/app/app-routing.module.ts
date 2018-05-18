import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './shared/guards/auth.guard';

import { GetStartedComponent } from './get-started/get-started.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate: [AuthGuard] },
      { path: 'magazine', loadChildren: './magazine/magazine.module#MagazineModule', canActivate: [AuthGuard] },
      { path: 'get-started', component: GetStartedComponent, pathMatch: 'full'},
      { path: '', loadChildren: './user/user.module#UserModule' },
      { path: '**', redirectTo: 'home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
