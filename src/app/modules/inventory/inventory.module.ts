import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { HeaderModule } from '../header/header.module';
import { AddComponent } from './add/add.component';
import { CategoryComponent } from './category/category.component';
import { FilterItemsComponent } from './filter-items/filter-items.component';
import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory/inventory.component';
import { ItemDialogComponent } from './item-dialog/item-dialog.component';
import { ItemPanelComponent } from './item-panel/item-panel.component';
import { ItemsComponent } from './items/items.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { MatPaginatorModule } from '@angular/material/paginator';

import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
@NgModule({
  declarations: [
    InventoryComponent,
    CategoryComponent,
    ItemsComponent,
    FilterItemsComponent,
    ItemPanelComponent,
    AddComponent,
    ItemDialogComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    HeaderModule,

    
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
  ]
})
export class InventoryModule {
  
}