import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { EquipmentService } from 'src/app/services/equipment.service';
import { AddComponent } from '../add/add.component';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit  {
  
  isFetching: boolean = false;
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [25, 50, 100, 250],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  selectedCategories: any = {};
  wordSearched: any = '';
  
  constructor(
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
    
  }

  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.getItems();
  }

  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
    this.getItems();
  }

  getItems(sortOrder: 'asc' | 'desc' = 'asc', searchWord: string = ''): void {
    console.log('Equipment type used for fetching items:', this.selectedCategories.equipmentType);
    const filters = {
      equipmentType: this.selectedCategories.equipmentType,
      brand: this.selectedCategories.brand,
      matter: this.selectedCategories.matter,
      description: this.selectedCategories.description,
      dateAcquired: this.selectedCategories.dateAcquired,
      remarks: this.selectedCategories.remarks,
      status: this.selectedCategories.status,
      department: this.selectedCategories.department
    };
  
    const paginationSettings: Pagination = {
      length: this.pagination.length,
      page: this.pagination.page,
      limit: this.pagination.limit,
      pageSizeOption: this.pagination.pageSizeOption
    };

    // Use the new searchOrGetItems method
    this.equipmentService.searchOrGetItems(searchWord, filters, paginationSettings)
      .subscribe(
        (response) => {
          this.itemlist = response.data;
          this.pagination.length = response.total;
          
          this.sortItemsByName(sortOrder);
          this.changeDetector.detectChanges();
        },
        (error) => {
          console.error('Error fetching items:', error);
        }
      );
  }
  searchItem(): void {
    const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
    console.log('Searching for:', searchWord);
    this.wordSearched = searchWord;
    const filters = {
      equipmentType: this.selectedCategories.equipmenttype || '',
      brand: this.selectedCategories.brand || '',
      matter: this.selectedCategories.matter || '',
      description: this.selectedCategories.description || '',
      remarks: this.selectedCategories.remarks || '',
      status: this.selectedCategories.status || '',
      department: this.selectedCategories.department || ''
    };
    
    console.log('Searched EquipmentType for fetching items:', filters.remarks);
    
    // Pass the searchWord to the getItems method
    this.getItems('asc', searchWord);
  }

  getSort(sortOrder: 'asc' | 'desc' = 'asc'): void {
    this.getItems(sortOrder, this.wordSearched)
  }

//   getItems(sortOrder: 'asc' | 'desc' = 'asc'): void {
    

//     console.log('Equipment type used for fetching items:', this.selectedCategories.equipmentType);
//     const filters = {
//       equipmentType: this.selectedCategories.equipmentType,
//       brand: this.selectedCategories.brand,
//       matter: this.selectedCategories.matter,
//       description: this.selectedCategories.description,
//       dateAcquired: this.selectedCategories.dateAcquired,
//       remarks: this.selectedCategories.remarks,
//       status: this.selectedCategories.status,
//       department: this.selectedCategories.department
//     };
    
//     console.log('Equipment type used for fetching items:', filters.status);
//     const paginationSettings: Pagination = {
//       length: this.pagination.length,
//       page: this.pagination.page,
//       limit: this.pagination.limit,
//       pageSizeOption: this.pagination.pageSizeOption
//     };
//     this.equipmentService.getItems(paginationSettings, filters)
//     .subscribe(
//       (response) => {
//         this.itemlist = response.data;
//         this.pagination.length = response.total;
        
//         this.sortItemsByName(sortOrder);
//         this.changeDetector.detectChanges();
//       },
//       (error) => {
//         console.error('Error fetching items:', error);
//       }
//     );
// }
  sortItemsByName(order: 'asc' | 'desc'): void {
    this.itemlist.sort((a: any, b: any) => {
      const nameA = a.name.toUpperCase();
      const nameB = b.name.toUpperCase();
      if (order === 'asc') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  }

  // searchItem(): void {
    

  //   const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
  //   console.log('Searching for:', searchWord);
    
  //   const filters = {
  //     equipmentType: this.selectedCategories.equipmenttype || '',
  //     brand: this.selectedCategories.brand || '',
  //     matter: this.selectedCategories.matter || '',
  //     description: this.selectedCategories.description || '',
  //     remarks: this.selectedCategories.remarks || '',
  //     status: this.selectedCategories.status || '',
  //     department: this.selectedCategories.department || ''
  //   };
    
  //   console.log('Searched EquipmentType for fetching items:', filters.remarks);
  //   this.equipmentService.searchEquipment(searchWord, filters).subscribe(
  //     (response) => {
  //       this.itemlist = response.data;
  //       this.changeDetector.detectChanges();
  //     },
  //     (error) => {
  //       console.error('Error searching equipment:', error);
  //     }
  //   );
  
  //   this.router.navigate(['/inventory/faculty'], {
  //     queryParams: {
  //       page: 1,
  //       limit: this.pagination.limit,
  //       opened: this.opened,
  //       search: searchWord,
  //       equipmentType: this.selectedCategories.equipmentType,
  //       brand: this.selectedCategories.brand,
  //       matter: this.selectedCategories.matter,
  //       description: this.selectedCategories.description,
  //       remarks: this.selectedCategories.remarks,
  //       status: this.selectedCategories.status,
  //       department: this.selectedCategories.department
  //     },
  //     queryParamsHandling: 'merge'
  //   });
  // }
  

  queryParamsHandler(params: Params): void {
    this.opened = params['opened'] == 'true' ? params['opened'] : false;
    this.pagination.limit = params['limit'] ? +params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    const searchword = params['search'] ? params['search'] : '';
    this.searchedWord.patchValue(searchword);
    
    const selectedCategories = {
      equipmentType: params['equipmentType'] ? params['equipmentType'] : '',
      brand: params['brand'] ? params['brand'] : '',
      matter: params['matter'] ? params['matter'] : '',
      description: params['description'] ? params['description'] : '',
      status: params['status'] ? params['status'] : '',
      department: params['department'] ? params['department'] : '',
      remarks: params['remarks'] ? params['remarks'] : '',
    };

    console.log('Selected equipment type from query params:', selectedCategories);
    this.handleSelectedCategories(selectedCategories);
  }

  addItem(): void {
      this.dialog.open(AddComponent, {
        height: '85vh',
        width: '36vw',
      });
  }
}
