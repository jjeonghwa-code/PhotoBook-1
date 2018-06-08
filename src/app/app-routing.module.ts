import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path: 'get-started', loadChildren: './pages/home-page/home-page.module#HomePageModule'},
  {path: 'magazine/create', loadChildren: './pages/magazine-page/magazine-page.module#MagazinePageModule'},
  {path: '', loadChildren: './pages/auth-page/auth-page.module#AuthPageModule'},
  {path: '**', redirectTo: 'get-started'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
