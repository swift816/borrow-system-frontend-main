import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoginHeaderRoutingModule } from './login-header-routing.module';
import { LoginHeaderComponent } from './login-header/login-header.component';



@NgModule({
  declarations: [
    LoginHeaderComponent
  ],
  imports: [
    CommonModule,
    LoginHeaderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports: [
    LoginHeaderComponent
  ]
})
export class LoginHeaderModule { }
