import { Location } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { EquipmentService } from 'src/app/services/equipment.service';

interface Name {
  value: string;
  viewValue: string;
  isSelected: boolean;
}
interface Equipment {
  value: string;
  viewValue: string;
  isSelected: boolean;
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
interface DateAcquired {
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

export interface SelectedSort {
  value: string;
  name: string;
  color: ThemePalette;
  isSelected: boolean;
}
interface Item {
  name: string;
}
interface Filters {
  equipmenttype: string;
}
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  
  equipments: Equipment[] = [];
  brands: Brand[] = [];
  dateAcquired: DateAcquired[] = [];
  
  selectedValue: string[] = [];
  selectedEquipment: Equipment | null = null;
  selectedBrands: Equipment | null = null;
  selectedMatter: Equipment | null = null;
  selectedDescription: Equipment | null = null;
  selectedStatus: Equipment | null = null;
  selectedRemarks: Equipment | null = null;
  selectedDepartment: Equipment | null = null;
  selectedSort: string | null = null;
  selectedDateAcquired: Date | null = null;
    matters: Matter[] = [
      { value: 'Solid', viewValue: 'Solid', isSelected: false },
      { value: 'Liquid', viewValue: 'Liquid', isSelected: false },
  ];
  descriptions: Description[] = [
      { value: 'Inventory', viewValue: 'Inventory', isSelected: false },
      { value: 'Non-Inventory', viewValue: 'Non-Inventory', isSelected: false },
  ];
  status: Status[] = [
      { value: 'Active', viewValue: 'Active', isSelected: false },
      { value: 'Obsolete', viewValue: 'Obsolete', isSelected: false },
      { value: 'Repair', viewValue: 'Repair', isSelected: false },
  ];
  remarks: Remarks[] = [
      { value: 'Functional', viewValue: 'Functional', isSelected: false },
      { value: 'Defective', viewValue: 'Defective', isSelected: false },
  ];
  departments: Department[] = [
      { value: 'ECL', viewValue: 'ECL', isSelected: false },
  ];
  
  sortSelecteds: SelectedSort[] = [
    { name: 'Name (A-Z)', color: undefined , value: 'asc', isSelected: false},
    { name: 'Name (Z-A)', color: undefined , value: 'desc', isSelected: false},
  ];
  selectedChipOptions: string[] = [];
  @Output() selectedCategories = new EventEmitter<any>();
  constructor(
    private location: Location ,
    private equipmentService: EquipmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.handleQueryParams(params);
    });
    this.loadEquipmentTypes();
    this.loadBrandList();
  }
  
  loadEquipmentTypes(): void {
    let currentPage = 1;
    let totalPages = 1;
    let allEquipmentTypes: Equipment[] = [];
    const fetchPage = () => {
      this.equipmentService.getEquipmentTypesWithPagination(currentPage, 10).subscribe(
        (response) => {
          totalPages = Math.ceil(response.total / 10);
  
          const equipments = response.data.map((type: any) => ({
            value: type.name,
            viewValue: type.name,
            isSelected: false,
          }));
          allEquipmentTypes = [...allEquipmentTypes, ...equipments];
  
          if (currentPage < totalPages) {
            currentPage++;
            fetchPage();
          } else {
          
            this.equipments = allEquipmentTypes;
            this.emitSelectedCategories();
          }
        },
        (error) => {
          console.error('Error fetching equipment types:', error);
        }
      );
    };
    
    fetchPage();
  }

  loadBrandList(): void {
    let currentPage = 1;
    let totalPages = 1;
    let allBrands: Brand[] = [];

    const fetchPage = () => {
      this.equipmentService.getBrandListWithPagination(currentPage, 10).subscribe(
        (response) => {
          totalPages = Math.ceil(response.total / 10);
  
          const brands = response.data.map((brand: any) => ({
            value: brand.brand,
            viewValue: brand.brand,
            isSelected: false
          }));
          allBrands = [...allBrands, ...brands];
  
          if (currentPage < totalPages) {
            currentPage++;
            fetchPage();
          } else {
            const uniqueBrands = Array.from(new Set(allBrands.map(brand => brand.value)))
              .map(value => {
                const originalBrand = allBrands.find(brand => brand.value === value);
                return originalBrand;
              })
              .filter((brand): brand is Brand => brand !== undefined);
  
            this.brands = uniqueBrands;
            this.emitSelectedCategories();
          }
        },
        (error) => {
          console.error('Error fetching brand list:', error);
        }
      );
    };

    fetchPage();
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
    this.dateAcquired.forEach((dateAcquired) => {
      dateAcquired.isSelected = params['dateAcquired'] === dateAcquired.value;
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
    this.sortSelecteds.forEach((sortSelected) => {
      sortSelected.isSelected = params['sort'] === sortSelected.value;
    });
    
    this.emitSelectedCategories();
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

  emitSelectedCategories(): void {
    const selectedCategories = {
      equipments: this.equipments.map((e) => e.value),
      brands: this.brands.map((b) => b.value),
      matters: this.matters.map((m) => m.value),
      descriptions: this.descriptions.map((d) => d.value),
      dateAcquired: this.dateAcquired.map((d) => d.value),
      status: this.status.map((r) => r.value),
      remarks: this.remarks.map((r) => r.value),
      departments: this.departments.map((d) => d.value),
      sortSelecteds: this.sortSelecteds.map((s) => s.value)
    };
    this.selectedCategories.emit(selectedCategories);
  }
  resetFilters(): void {
    console.log('Resetting filters...');
    this.equipments.forEach(equipment => equipment.isSelected = false);
    this.brands.forEach(brand => brand.isSelected = false);
    this.matters.forEach(matter => matter.isSelected = false);
    this.descriptions.forEach(description => description.isSelected = false);
    this.status.forEach(status => status.isSelected = false);
    this.remarks.forEach(remarks => remarks.isSelected = false);
    this.departments.forEach(department => department.isSelected = false);
    this.selectedEquipment = null;
    this.selectedBrands = null;
    this.selectedMatter = null;
    this.selectedDescription = null;
    this.selectedStatus = null;
    this.selectedRemarks = null;
    this.selectedDepartment = null;
    this.selectedDateAcquired = null;
    this.selectedSort = null;
      const queryParams: Params = {};
      queryParams['equipmentType'] = '';
      queryParams['brand'] = '';
      queryParams['matter'] = '';
      queryParams['description'] = '';
      queryParams['remarks'] = '';
      queryParams['department'] = '';
      queryParams['dateAcquired'] = '';
      queryParams['status'] = '';
      queryParams['sort'] = '';
      this.router.navigate([], {
        relativeTo: this.activatedRoute,
        queryParams,
        queryParamsHandling: 'merge',
      });
    }
}
