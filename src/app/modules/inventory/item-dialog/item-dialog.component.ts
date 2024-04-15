import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';

import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-item-dialog',
  templateUrl: './item-dialog.component.html',
  styleUrls: ['./item-dialog.component.css']
})
export class ItemDialogComponent implements OnInit {
  
  imageUrl: string | null = null; // Keep imageUrl as a string
  googleDriveLink: string = ''; // Keep googleDriveLink as a string

  isEditingImage = false;
  constructor(
    public dialogRef: MatDialogRef<ItemDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private equipmentService: EquipmentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (!this.data.images || typeof this.data.images !== 'object') {
      this.data.images = {
          thumbnailUrl: '',
          midSizeUrl: '',
          Url: ''
      };
    }
  }
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return !currentUser || !this.cantEditRole(currentUser.role);
  }

  private cantEditRole(role: string): boolean {
    const allowedRoles = ['faculty', 'Instructor'];
    return allowedRoles.includes(role);
  }

  loadImageFromGoogleDrive(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    // Directly assign the input value to googleDriveLink
    this.googleDriveLink = inputElement.value;
    const match = this.googleDriveLink.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);
    
    if (match) {
        const imageId = match[1];
        this.imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
        console.log('Image URL:', this.imageUrl);
        if (typeof this.data.images === 'object') {
            this.data.images.thumbnailUrl = this.imageUrl;
        } else {
            console.error('data.images is not an object:', this.data.images);
        }
    } else {
        this.imageUrl = null;
        if (typeof this.data.images === 'object') {
            this.data.images.thumbnailUrl = '';
        } else {
            console.error('data.images is not an object:', this.data.images);
        }
    }
  }

  saveChanges() {
    if (typeof this.data.images !== 'object') {
        console.error('data.images is not an object:', this.data.images);
        return;
    }

    if (this.imageUrl) {
        this.data.images.Url = this.imageUrl;
        this.data.images.midSizeUrl = this.imageUrl;
    }
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
