import { Component, OnInit, Renderer2 } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-page-panel',
  templateUrl: './page-panel.component.html',
  styleUrls: ['./page-panel.component.css']
})
export class PagePanelComponent implements OnInit{
  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    
  }
  directToLogin(): void {
    this.router.navigate(['/login']);
  }
}