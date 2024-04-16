import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Item } from 'src/app/models/Items';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  
  addedEquipment: Item[] = [];
  isFetching: boolean = false;
  noItems: boolean = false;
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  greetings: string = 'CPE';
  equipmentlist: any = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  openedCart: boolean = false;

  openedCategory: boolean = false;

  selectedCategories: any = {};
  opened: boolean = true;
  searchedWord = new FormControl('');
  itemlist: any = [];
  wordSearched: any = '';
  sortUsed: 'asc' | 'desc' = 'asc';
  dateSelected = new FormControl('');
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router, 
    private changeDetector: ChangeDetectorRef,) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.isAllowedRole(currentUser.role)) {
      this.router.navigate(['/']);
    }
    this.activatedRoute.queryParams.subscribe((params) => this.queryParamsHandler(params));
  }

  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty', 'Student'];
    return allowedRoles.includes(role);
  }
  
  addToCart(item: Item) {
    this.addedEquipment.push(item);
 }
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'Instructor' : false;
  }
  searchProduct(event: any) {
    console.log(event);
  }

  cartClicked() {
    this.openedCart = !this.openedCart;
  }
  categoryClicked() {
    this.openedCategory = !this.openedCategory;
  }
  
  toggleItemInCart(item: Item) {
    const index = this.addedEquipment.findIndex(e => e._id === item._id);
    if (index !== -1) {
      this.addedEquipment.splice(index, 1);
    } else {
      const newItem = { ...item, quantity: 1 };
      this.addedEquipment.push(newItem);
    }
  }
  
  addItemToAddedEquipment(item: Item) {
    const existingItemIndex = this.addedEquipment.findIndex(e => e._id === item._id);
  
    if (existingItemIndex !== -1) {
      return
    } else {
      this.addedEquipment.push(item);
    }
  }

  removeItemFromAddedEquipment(item: Item) {
    const index = this.addedEquipment.findIndex(e => e._id === item._id);
    if (index !== -1) {
      this.addedEquipment.splice(index, 1);
    }
  }
  
  updateItemQuantityInAddedEquipment({ item, quantity }: { item: Item; quantity: number }) {
    const index = this.addedEquipment.indexOf(item);
    if (index > -1) {
      this.addedEquipment[index].quantity = quantity;
    }
  }
  getItems(searchWord: string = ''): void {
    console.log(searchWord);
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

  // getEquipmentList() {
  //   let filter: Filter = {
  //     searchWord: this.searchedWord,
  //   };
  //   this.equipmentService.getItems(this.pagination, filter).subscribe((resp) => {
  //     this.equipmentlist = resp.data;
  //   });
  // }
  onPageChange(event: any): void {
    this.pagination.page = event.pageIndex + 1;
    this.pagination.limit = event.pageSize;
    this.getItems();
  }
  handleSelectedCategories(categories: any): void {
    this.selectedCategories = categories;
    this.getItems();
  }
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
}
