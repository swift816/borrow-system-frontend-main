import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { HeaderModule } from '../header/header.module';
import { MaterialModule } from '../material.module';
import { StudentHeaderModule } from '../student-header/student-header.module';
import { AddedEquipmentCardComponent } from './added-equipment-card/added-equipment-card.component';
import { BorrowEquipmentCardComponent } from './borrow-equipment-card/borrow-equipment-card.component';
import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow/borrow.component';
@NgModule({
  declarations: [BorrowComponent, BorrowEquipmentCardComponent, AddedEquipmentCardComponent],
  imports: [CommonModule, BorrowRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    HeaderModule,
    StudentHeaderModule],
  exports: [BorrowComponent, BorrowEquipmentCardComponent, AddedEquipmentCardComponent,]
})
export class BorrowModule { }
