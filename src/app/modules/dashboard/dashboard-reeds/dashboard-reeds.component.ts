import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-reeds',
  templateUrl: './dashboard-reeds.component.html',
  styleUrls: ['./dashboard-reeds.component.css']
})
export class DashboardReedsComponent implements OnInit{

  constructor(private router: Router) { }

  ngOnInit(): void {
    
  }
  directToInventory(): void {
    this.router.navigate(['/inventory/faculty']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/reads']);
  }
}
