
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit{
  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private equipmentService: EquipmentService
  ) {}

  ngOnInit(): void {

  
  }
  saveChanges() {
    this.equipmentService.updateItem(this.data._id, this.data).subscribe(response => {
      if (response.success) {
        
        console.log('Updating item with ID:', this.data._id);
        console.log('Item updated successfully:', response.data);
        this.dialogRef.close();
      } else {
        
        console.log('Updating item with ID:', this.data._id);
        console.error('Error updating item:', response.message);
      }
    }, error => {
      
      console.error('Error updating item:', error);
    });
  }
}
