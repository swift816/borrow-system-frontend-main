import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Filter } from 'src/app/models/Filter';
import { Pagination } from 'src/app/models/Pagination';
import { AuthService } from 'src/app/services/auth.service';
import { EquipmentService } from 'src/app/services/equipment.service';
@Component({
  selector: 'app-borrow',
  templateUrl: './borrow.component.html',
  styleUrls: ['./borrow.component.css'],
})
export class BorrowComponent implements OnInit {
  pagination: Pagination = {
    length: 100,
    page: 1,
    limit: 25,
    pageSizeOption: [5, 10, 25, 100],
  };
  greetings: string = 'CPE';
  equipmentlist: any = [1, 1, 2, 3, 4, 5, 6, 7, 8, 9, 1];
  searchedWord = '';
  opened: boolean = false;
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {}

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
  
  
  isFaculty(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'Instructor' : false;
  }
  searchProduct(event: any) {
    console.log(event);
  }

  cartClicked() {
    this.opened = !this.opened;
  }

  getEquipmentList() {
    let filter: Filter = {
      searchWord: this.searchedWord,
    };
    this.equipmentService.getItems(this.pagination, filter).subscribe((resp) => {
      this.equipmentlist = resp.data;
    });
  }

  queryParamsHandler(params: Params) {
    this.pagination.limit = params['limit'] ? params['limit'] : 25;
    this.pagination.page = params['page'] ? params['page'] : 1;
    this.searchedWord = params['search'] ? params['search'] : '';
    this.getEquipmentList();
  }
}
