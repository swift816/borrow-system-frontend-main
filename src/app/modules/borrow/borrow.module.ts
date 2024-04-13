import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { AddedEquipmentCardComponent } from './added-equipment-card/added-equipment-card.component';
import { BorrowEquipmentCardComponent } from './borrow-equipment-card/borrow-equipment-card.component';
import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow/borrow.component';

@NgModule({
  declarations: [BorrowComponent, BorrowEquipmentCardComponent, AddedEquipmentCardComponent],
  imports: [CommonModule, BorrowRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
  exports: [BorrowComponent, BorrowEquipmentCardComponent, AddedEquipmentCardComponent]
})
export class BorrowModule { }
