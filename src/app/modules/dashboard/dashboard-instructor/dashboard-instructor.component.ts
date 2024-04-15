import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-dashboard-instructor',
  templateUrl: './dashboard-instructor.component.html',
  styleUrls: ['./dashboard-instructor.component.css']
})
export class DashboardInstructorComponent implements OnInit{
  
  currentUser: any;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (!this.currentUser || this.currentUser.role !== 'Instructor') {
      this.router.navigate(['/']);
    }
  }
  directToInventory(): void {
    this.router.navigate(['/inventory']);
  }
  directToHistory(): void {
    this.router.navigate(['/history/reads']);
  }
}