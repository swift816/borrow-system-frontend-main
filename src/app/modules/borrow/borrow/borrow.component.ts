import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Filter } from 'src/app/models/Filter';
import { Pagination } from 'src/app/models/Pagination';
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
  constructor(private equipmentService: EquipmentService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => this.queryParamsHandler(params));
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
