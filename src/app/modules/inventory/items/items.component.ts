import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
  ActivatedRoute,
  Params,
  Router
} from '@angular/router';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
import { AddComponent } from '../add/add.component';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit  {
  
  isFetching: boolean = false;
  noItems: boolean = false;
  pagination: Pagination = {
    length: 0,
    page: 1,
    limit: 25,
    pageSizeOption: [25, 50, 100, 250, 500],
  };
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  selectedCategories: any = {};
  wordSearched: any = '';
  sortUsed: 'asc' | 'desc' = 'asc';
  dateSelected = new FormControl('');
  constructor(
    private equipmentService: EquipmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private changeDetector: ChangeDetectorRef,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) =>
      this.queryParamsHandler(params)
    );
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.isAllowedRole(currentUser.role)) {
      this.router.navigate(['/']);
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
  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty'];
    return allowedRoles.includes(role);
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
  
  // getItems(sortOrder: 'asc' | 'desc' = 'asc', searchWord: string = ''): void {
  //   console.log('Equipment type used for fetching items:', this.selectedCategories.equipmentType);
  //   const filters = {
  //     equipmentType: this.selectedCategories.equipmentType,
  //     brand: this.selectedCategories.brand,
  //     matter: this.selectedCategories.matter,
  //     description: this.selectedCategories.description,
  //     dateAcquired: this.selectedCategories.dateAcquired,
  //     remarks: this.selectedCategories.remarks,
  //     status: this.selectedCategories.status,
  //     department: this.selectedCategories.department,
  //     name: { $exists: true, $ne: "" },
  //   };
    
  //   const paginationSettings: Pagination = {
  //     length: this.pagination.length,
  //     page: this.pagination.page,
  //     limit: this.pagination.limit,
  //     pageSizeOption: this.pagination.pageSizeOption
  //   };

  //   this.equipmentService.searchOrGetItems(searchWord, filters, paginationSettings)
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
  getItems(searchWord: string = ''): void {
    
    const sortOrder = this.sortUsed;
    console.log(this.sortUsed);
    const dateSelected = this.dateSelected.value ? this.dateSelected.value : '';
    this.isFetching = true;
    this.noItems = false;
    console.log('Equipment type used for fetching items:', this.selectedCategories.equipmentType);
    const filters = {
      equipmentType: this.selectedCategories.equipmentType,
      brand: this.selectedCategories.brand,
      matter: this.selectedCategories.matter,
      description: this.selectedCategories.description,
      remarks: this.selectedCategories.remarks,
      status: this.selectedCategories.status,
      department: this.selectedCategories.department,
      name: { $exists: true, $ne: "" },
    };

    const paginationSettings: Pagination = {
      length: 0,
      page: this.pagination.page,
      limit: (dateSelected || searchWord) ? 10000 : this.pagination.limit,
      pageSizeOption: this.pagination.pageSizeOption
    };
    
    this.equipmentService.getItems(paginationSettings, filters)
      .subscribe(
        (response) => {
          this.itemlist = this.filterItemsBySearchWord(response.data, searchWord, dateSelected);
          this.pagination.length = response.total;
          this.sortItemsByName(sortOrder);
          this.isFetching = false;
          this.changeDetector.detectChanges();
        },
        (error) => {
          console.error('Error fetching items:', error);
          this.noItems = true;
          this.isFetching = false;
        }
      );
  }
  searchItem(): void {
    const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
    console.log('Searching for:', searchWord);
    this.wordSearched = searchWord;
    
    console.log("SEARCH WORD", searchWord);
    this.getItems(searchWord,);
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based in JavaScript
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  filterItemsBySearchWord(items: any[], searchWord: string, dateSelected: string): any[] {
  console.log("SEARCH WORD", dateSelected);
    const searchFields = ['name'];
    const dateFields = ['dateAcquired'];

    let filteredItems = items.filter(item => {
      const searchFields = ['name'];
      return searchFields.some(field => {
        return item[field] && item[field].toLowerCase().includes(searchWord.toLowerCase());
      });
    });
  
    if (dateSelected) {
      const dateFields = ['dateAcquired'];
      filteredItems = filteredItems.filter(item => {
        return dateFields.some(field => {
          return item[field] && item[field].toLowerCase().includes(dateSelected.toLowerCase());
        });
      });
    }
    
  return filteredItems;
  }

  // filterItemsBySearchWord(items: any[], searchWord: string): any[] {
  //   if (!searchWord) {
  //     return items;
  //   }
  //   const searchFields = ['name',];

  //   return items.filter(item => {
  //     return searchFields.some(field => {
  //       return item[field] && item[field].toLowerCase().includes(searchWord.toLowerCase());
  //     });
  //   });
  // }
  // searchItem(): void {
  //   const searchWord = this.searchedWord.value ? this.searchedWord.value : '';
  //   console.log('Searching for:', searchWord);
  //   this.wordSearched = searchWord;
  //   const filters = {
  //     equipmentType: this.selectedCategories.equipmenttype || '',
  //     brand: this.selectedCategories.brand || '',
  //     matter: this.selectedCategories.matter || '',
  //     description: this.selectedCategories.description || '',
  //     remarks: this.selectedCategories.remarks || '',
  //     status: this.selectedCategories.status || '',
  //     department: this.selectedCategories.department || ''
  //   };
  //       this.router.navigate(['/inventory/faculty'], {
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
  //   console.log('Searched EquipmentType for fetching items:', filters.remarks);
    
  //   this.getItems('asc', searchWord);
  // }

  getSort(sortOrder: 'asc' | 'desc' = 'asc'): void {
    this.sortUsed = sortOrder;
    this.getItems(this.wordSearched)
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
      const nameA = a.name ? a.name.toUpperCase() : '';
      const nameB = b.name ? b.name.toUpperCase() : '';
  
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
  //     department: this.selectedCategories.department || '',

  //      name: { $exists: true, $ne: "" },
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
      dateAcquired: params['dateAcquired'] ? params['dateAcquired'] : '',
      selectedSort: params['sort'] ? params['sort'] : ''
    };
    this.sortUsed = params['sort'] ? params['sort'] : 'asc';
    const dateSelected = selectedCategories.dateAcquired;
    this.dateSelected.patchValue(dateSelected);
    console.log('Selected equipment type from query params:', this.sortUsed);
    this.handleSelectedCategories(selectedCategories);
  }

  addItem(): void {
      this.dialog.open(AddComponent, {
        height: '85vh',
        width: '36vw',
      });
  }
}
