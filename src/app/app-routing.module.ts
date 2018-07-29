import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@photobook/core/guards/auth.guard';

const routes: Routes = [
  {path: 'get-started', loadChildren: './pages/home-page/home-page.module#HomePageModule'},
  {path: 'profile', loadChildren: './pages/profile-page/profile-page.module#ProfilePageModule'},
  {path: 'give-present/:order_id', loadChildren: './pages/give-present-page/give-present-page.module#GivePresentPageModule' },
  {path: 'magazine/create', loadChildren: './pages/magazine-page/magazine-page.module#MagazinePageModule', canActivate: [AuthGuard]},
  {path: '', loadChildren: './pages/auth-page/auth-page.module#AuthPageModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
