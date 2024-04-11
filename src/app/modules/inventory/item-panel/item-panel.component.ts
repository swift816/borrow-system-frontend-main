import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/models/Items';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-item-panel',
  templateUrl: './item-panel.component.html',
  styleUrls: ['./item-panel.component.css']
})
export class ItemPanelComponent implements OnInit{
  @Input() item: Item = {} as Item | any;
  panelOpenState = false;
  constructor(
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.viewImage();
  }

  viewImage(){
    const match = this.item.images.thumbnailUrl.match(/\/(?:file\/d\/|thumbnail\?id=)([\w-]+)(?:\/|$)/);
    
    if (match) {
      const imageId = match[1];
      this.item.images.thumbnailUrl = `https://drive.google.com/thumbnail?id=${imageId}&sz=w1000`;
      console.log('Image URL:', this.item);
    } else {
      this.item.images.thumbnailUrl = "";
    }
  }
  viewItemDetails() {
    console.log('view');
    this.dialog.open(ItemDialogComponent, {
      data: this.item,
      height: '80vh',
      width: '40vw',
    });
  }

}
