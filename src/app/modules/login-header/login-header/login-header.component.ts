import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-header',
  templateUrl: './login-header.component.html',
  styleUrls: ['./login-header.component.css']
})
export class LoginHeaderComponent implements OnInit{
  constructor(private router: Router) { }

  ngOnInit(): void {

  }
  directToLogin(): void {
    this.router.navigate(['/login']);
  }
}
