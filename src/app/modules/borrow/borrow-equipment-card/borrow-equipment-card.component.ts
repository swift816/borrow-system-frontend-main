import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from 'src/app/models/Items';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-borrow-equipment-card',
  templateUrl: './borrow-equipment-card.component.html',
  styleUrls: ['./borrow-equipment-card.component.css'],
})
export class BorrowEquipmentCardComponent implements OnInit {
  opened: boolean = true;
  defaultImage = '../../../../assets//equipment_default_image.png';
  displayImage: string = '';
  @Input() equipment: Item | any;
  @Output() addToCart = new EventEmitter<Item>();
  constructor(private _snackbar: MatSnackBar, private equipmentService: EquipmentService) {}

  ngOnInit(): void {
    const midsizeurl = this.equipment?.images?.midSizeUrl?.length ? this.equipment?.images?.midSizeUrl : '';
    const id: string = midsizeurl.substring(midsizeurl.lastIndexOf('/d/') + 3, midsizeurl.lastIndexOf('/view'));
    console.log(id);
    this.displayImage = `https://drive.google.com/thumbnail?id=${id}&&sz=w1000`;
  }

  addEquipment() {
    // this.equipmentService.productSubject.next(this.equipment);
    
    this.addToCart.emit(this.equipment);
    this._snackbar.open('Item Added Successful', '', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 1000,
      panelClass: ['custom-snackbar'],
    });
  }

}
