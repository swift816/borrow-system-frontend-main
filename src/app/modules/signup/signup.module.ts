import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SignupHeaderComponent } from './signup-header/signup-header.component';


@NgModule({
  declarations: [
    SignupComponent,
    SignupHeaderComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ]
})
export class SignupModule { }
