import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentHeaderRoutingModule } from './student-header-routing.module';
import { StudentHeaderComponent } from './student-header/student-header.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    StudentHeaderComponent
  ],
  imports: [
    CommonModule,
    StudentHeaderRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  exports:[
    StudentHeaderComponent
  ]
})
export class StudentHeaderModule { }
