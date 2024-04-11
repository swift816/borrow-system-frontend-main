import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BorrowRoutingModule } from './borrow-routing.module';
import { BorrowComponent } from './borrow/borrow.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material.module';
import { BorrowEquipmentCardComponent } from './borrow-equipment-card/borrow-equipment-card.component';
import { AddedEquipmentCardComponent } from './added-equipment-card/added-equipment-card.component';

@NgModule({
  declarations: [BorrowComponent, BorrowEquipmentCardComponent, AddedEquipmentCardComponent],
  imports: [CommonModule, BorrowRoutingModule, FormsModule, ReactiveFormsModule, MaterialModule],
})
export class BorrowModule { }
