import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';
interface Matter {
  value: string;
  viewValue: string;
}

interface Status {
  value: string;
  viewValue: string;
}

interface Remark {
  value: string;
  viewValue: string;
}
interface Description {
  value: string;
  viewValue: string;
}

interface Department {
  value: string;
  viewValue: string;
}

interface Equipment{
  name: string;
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  
  isFetching: boolean = false;
  imageUrl: string | null = null;
  googleDriveLink: string = '';

  matters: Matter[] = [
    {value: 'Solid', viewValue: 'Solid'},
    {value: 'Liquid', viewValue: 'Liquid'},
  ];

  status: Status[] = [
    {value: 'Active', viewValue: 'Active'},
    {value: 'Obsolete', viewValue: 'Obsolete'},
    {value: 'Repair', viewValue: 'Repair'},
  ];

  remarks: Remark[] = [
    {value: 'Functional', viewValue: 'Functional'},
    {value: 'Defective', viewValue: 'Defective'},
  ];
  descriptions: Description[] = [
    {value: 'Inventory', viewValue: 'Inventory'},
    {value: 'Non-inventory', viewValue: 'Non-inventory'},
  ];

  departments: Department[] = [
    {value: 'ECE', viewValue: 'ECE'},
    {value: 'ECL', viewValue: 'ECL'},
  ];
  
  addItemForm: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private equipmentService: EquipmentService ,
    @Inject(MAT_DIALOG_DATA) public data: Item,
    private fb: FormBuilder,
  ) {
    this.addItemForm = this.fb.group({
      name: ['', Validators.required],
      equipmentType: ['', Validators.required],
      brand: ['', Validators.required],
      matter: ['', Validators.required],
      serial: ['', Validators.required],
      description: ['', Validators.required],
      color: ['', Validators.required],
      status: ['', Validators.required],
      remarks: ['', Validators.required],
      checkedBy: ['', Validators.required],
      department: ['', Validators.required],
      quantity: [1, Validators.required],
    });
  }

  ngOnInit(): void {}

  loadImageFromGoogleDrive(event: Event): void {

    const inputElement = event.target as HTMLInputElement;
    const googleDriveLink = inputElement.value;

    this.googleDriveLink = googleDriveLink;
    const match = this.googleDriveLink.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);
    
    if (match) {
        const imageId = match[1];
        this.imageUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
        console.log('Image URL:', this.imageUrl);
    } else {
        this.imageUrl = null;
    }
  }
  onSubmit(): void {
    
    this.isFetching = true;
    console.log('Form check valid: ', this.addItemForm.value);
    
    if (this.addItemForm.valid) {
      const itemData = this.addItemForm.value;
    
      itemData.images = { Url: this.googleDriveLink };
      this.equipmentService.addEquipment(itemData).subscribe(
        response => {
          
          this.isFetching = false;
          console.log('Item created successfully:', response);
          this.dialogRef.close();
        },
        error => {
          console.error('Error creating item:', error);
        }
      );
      const equipmentTypeData = { name: itemData.equipmentType };
      this.equipmentService.addEquipmentType(equipmentTypeData).subscribe(
        response => {
          console.log('Equipment type added successfully:', response);
        },
        error => {
          console.error('Error adding equipment type:', error);
        }
      );
  } else {
      console.log('Form is not valid');
  }
  
  }
  
}
