import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})
export class AdminHeaderComponent {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router,) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'Admin') {
      this.router.navigate(['/']);
    }
  }
  logout(event: Event): void {
    event.preventDefault();
    this.authService.logout();
  }
  dashboard(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/dashboard/admin']);
  }
  inventory(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/inventory']);
  }
}