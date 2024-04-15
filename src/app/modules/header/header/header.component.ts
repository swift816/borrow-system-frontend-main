import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  currentUser: any;

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'Instructor') {
      this.router.navigate(['/']);
    }
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
  dashboard(event: Event): void {
    
    event.preventDefault();
    const userRole = this.currentUser.role;

    let dashboardRoute = '/dashboard/default';
    if (userRole === 'Instructor') {
      dashboardRoute = '/dashboard/instructor';
    }
    this.router.navigate([dashboardRoute]);
  }
  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inventory']);
  }
}