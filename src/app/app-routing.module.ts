import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'login',
    loadChildren: ()=> import('./modules/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'signup',
    loadChildren: ()=> import('./modules/signup/signup.module').then(m => m.SignupModule)
  },
  {
    path: 'borrow',
    loadChildren: ()=> import('./modules/borrow/borrow.module').then(m => m.BorrowModule)
  },
  {
    path: 'inventory',
    loadChildren: ()=> import('./modules/inventory/inventory.module').then(m => m.InventoryModule)
  },
  {
    path: 'landing-page',
    loadChildren: ()=> import('./modules/landing-page/landing-page.module').then(m=>m.LandingPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: ()=> import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'history',
    loadChildren: ()=> import('./modules/history/history.module').then(m => m.HistoryModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

