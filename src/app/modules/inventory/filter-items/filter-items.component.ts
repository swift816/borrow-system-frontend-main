import { Component, EventEmitter, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export interface ChipColor {
  name: string;
  color: ThemePalette;
  sortOrder: 'asc' | 'desc';
}
@Component({
  selector: 'app-filter-items',
  templateUrl: './filter-items.component.html',
  styleUrls: ['./filter-items.component.css']
  
})
export class FilterItemsComponent {
  
  @Output() sortOrderSelected = new EventEmitter<'asc' | 'desc'>();
  availableColors: ChipColor[] = [
    { name: 'Name (A-Z)', color: undefined, sortOrder: 'asc' },
    { name: 'Name (Z-A)', color: undefined, sortOrder: 'desc' },
  ];


}
