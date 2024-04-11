import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';

import { LoginHeaderModule } from '../login-header/login-header.module';

import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PagePanelComponent } from './page-panel/page-panel.component';
@NgModule({
  declarations: [
    LandingPageComponent,
    PagePanelComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    LoginHeaderModule,
    MatButtonModule,
    MatChipsModule,
    MatInputModule,
    MatIconModule
  ],
  bootstrap:[
    
  ]
})
export class LandingPageModule { }
