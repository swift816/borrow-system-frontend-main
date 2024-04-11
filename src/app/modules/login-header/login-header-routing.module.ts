import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginHeaderComponent } from './login-header/login-header.component';

const routes: Routes = [
  {
    path: '',
    component: LoginHeaderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginHeaderRoutingModule { }
