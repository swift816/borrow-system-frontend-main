import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';

interface Equipment {
  value: string;
  viewValue: string;
  isSelected: boolean;
  subcategories: { value: string, viewValue: string }[];
}

interface Brand {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Matter {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Description {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Status {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Remarks {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

interface Department {
  value: string;
  viewValue: string;
  isSelected: boolean;
}

export interface ChipColor {
  name: string;
  color: ThemePalette;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  
  equipments: Equipment[] = [];
  brands: Brand[] = [];
  matters: Matter[] = [];
  descriptions: Description[] = [];
  status: Status[] = [];
  remarks: Remarks[] = [];
  departments: Remarks[] = [];
  selectedValue: string[] = [];
  selectedEquipment: Equipment | null = null;
  @Output() selectedCategories = new EventEmitter<any>();

  constructor(
    
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.handleQueryParams(params);
    });
    this.loadItemsAndCategories();
    this.loadEquipmentTypes();
    this.loadBrandList();
  }
  populateSubcategories(): void {
    this.equipments.forEach(equipment => {
      equipment.subcategories = [
        { value: 'subcategory1', viewValue: 'Subcategory 1' },
        { value: 'subcategory2', viewValue: 'Subcategory 2' }
      ];
    });
  }
  loadEquipmentTypes(): void {
    this.equipmentService.getEquipmentTypes().subscribe(
      (response) => {
        this.equipments = response.map((type: any) => ({
          value: type.name,
          viewValue: type.name,
          isSelected: false,
          subcategories: []
        }));
        this.emitSelectedCategories();
      },
      (error) => {
        console.error('Error fetching equipment types:', error);
      }
    );
  }
  loadBrandList(): void {
    this.equipmentService.getBrandList().subscribe(
      (response) => {
        this.brands = response.map((brand: any) => ({
          value: brand.name,
          viewValue: brand.name,
          isSelected: false
        }));
        this.emitSelectedCategories();
      },
      (error) => {
        console.error('Error fetching brand list:', error);
      }
    );
  }
  handleQueryParams(params: Params): void {
    
    this.equipments.forEach((equipment) => {
      equipment.isSelected = params['equipmentType'] === equipment.value;
      console.log(equipment.isSelected);
    });
  
    this.brands.forEach((brand) => {
      brand.isSelected = params['brand'] === brand.value;
    });
  
    this.matters.forEach((matter) => {
      matter.isSelected = params['matter'] === matter.value;
    });
  
    this.descriptions.forEach((description) => {
      description.isSelected = params['description'] === description.value;
    });
    
    this.status.forEach((status) => {
      status.isSelected = params['status'] === status.value;
    });

    this.remarks.forEach((remark) => {
      remark.isSelected = params['remarks'] === remark.value;
    });
  
    this.departments.forEach((department) => {
      department.isSelected = params['department'] === department.value;
    });
  
    this.emitSelectedCategories();
  }
  loadItemsAndCategories(): void {
    const pagination: Pagination = {
      length: 100,
      page: 1,
      limit: 25,
      pageSizeOption: [5, 10, 25, 100],
    };
  
    this.equipmentService.getItems(pagination, {}).subscribe(
      (response) => {
        const items = response.data;
        this.matters = this.getUniqueValues(items, 'matter');
        this.descriptions = this.getUniqueValues(items, 'description');
        this.status = this.getUniqueValues(items, 'status');
        this.remarks = this.getUniqueValues(items, 'remarks');
        this.departments = this.getUniqueValues(items, 'department');
        
        this.populateSubcategories();
  
        this.emitSelectedCategories();
      },
      (error) => {
        console.error('Error fetching items:', error);
      }
    );
  }
  
  

  private getUniqueValues(items: any[], key: string): any[] {
    const uniqueValues: any[] = [];
    items.forEach((item) => {
      if (item[key] && !uniqueValues.some((val) => val.value === item[key])) {
        uniqueValues.push({ value: item[key], viewValue: item[key] });
      }
    });
    return uniqueValues;
  }
  updateQueryParams(category: string, value: string): void {
    const queryParams: Params = {};
    queryParams[category] = value;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  updateEquipmentSubcategories(selectedEquipmentValue: string): void {
    this.selectedEquipment = this.equipments.find(equipment => equipment.value === selectedEquipmentValue) || null;
  }
  updateQueryParamsWithSubcategory(equipment: Equipment, subcategory: string): void {
    const queryParams: Params = {};
    queryParams['equipmentType'] = equipment.value;
    queryParams['subcategory'] = subcategory;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
  emitSelectedCategories(): void {
    const selectedCategories = {
      equipments: this.equipments.map((e) => e.value),
      brands: this.brands.map((b) => b.value),
      matters: this.matters.map((m) => m.value),
      descriptions: this.descriptions.map((d) => d.value),
      status: this.status.map((r) => r.value),
      remarks: this.remarks.map((r) => r.value),
      departments: this.remarks.map((r) => r.value),
    };
    this.selectedCategories.emit(selectedCategories);
  }
  
  availableColors: ChipColor[] = [
    { name: 'Name (A-Z)', color: undefined },
    { name: 'Name (Z-A)', color: undefined },
    { name: 'Color (A-Z)', color: undefined },
    { name: 'Color (Z-A)', color: undefined },
    { name: 'Status', color: undefined },
    { name: 'Tags', color: undefined },
  ];
}
