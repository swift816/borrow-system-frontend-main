import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit{
  
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'Admin') {
      this.router.navigate(['/']);
    }
  }
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/reads']);
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
}
