import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ReadsHeaderRoutingModule } from './reads-header-routing.module';
import { ReadsHeaderComponent } from './reads-header/reads-header.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
@NgModule({
  declarations: [
    ReadsHeaderComponent
  ],
  imports: [
    CommonModule,
    ReadsHeaderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatToolbarModule
  ],
  exports: [
    ReadsHeaderComponent
  ]
})
export class ReadsHeaderModule { }
