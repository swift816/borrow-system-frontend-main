import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from 'src/app/models/Items';

@Component({
selector: 'app-added-equipment-card',
templateUrl: './added-equipment-card.component.html',
styleUrls: ['./added-equipment-card.component.css']
})
export class AddedEquipmentCardComponent {
  @Input() equipment!: Item;
  @Output() removeFromCart = new EventEmitter<Item>();
  @Output() updateQuantity = new EventEmitter<{ item: Item; quantity: number }>();
  
  @Output() toggleInCart = new EventEmitter<Item>();
  constructor() {}

  removeItem() {
    this.removeFromCart.emit(this.equipment);
  }

  updateItemQuantity(quantity: number) {
      this.updateQuantity.emit({ item: this.equipment, quantity });
  }
  toggleItemInCart() {
    this.toggleInCart.emit(this.equipment);
  }
}
