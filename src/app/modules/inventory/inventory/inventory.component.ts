import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.css']
})
export class InventoryComponent implements OnInit{
  constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser || !this.isAllowedRole(currentUser.role)) {
      this.router.navigate(['/']);
    }
    this.activatedRoute. queryParams.subscribe((params: Params)=>{

    })
  }
  isAdmin(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'Admin' : false;
  }
  isReads(): boolean {
    const currentUser = this.authService.getCurrentUser();
    return currentUser ? currentUser.role === 'reads' : false;
  }
  
  onFilterSelect(event: any){
    let filter = event.filtername;
    let value = event.value
    const naviationExtras: NavigationExtras = {
      queryParams: {
        [filter]: value
      },
    };
  }
  private isAllowedRole(role: string): boolean {
    const allowedRoles = ['Admin', 'Instructor', 'reads', 'oic', 'faculty'];
    return allowedRoles.includes(role);
  }
}

