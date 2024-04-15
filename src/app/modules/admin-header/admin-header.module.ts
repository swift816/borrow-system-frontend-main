import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AdminHeaderRoutingModule } from './admin-header-routing.module';
import { AdminHeaderComponent } from './admin-header/admin-header.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    AdminHeaderComponent
  ],
  imports: [
    CommonModule,
    AdminHeaderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule
  ],
  exports: [
    AdminHeaderComponent
  ]
})
export class AdminHeaderModule { }
