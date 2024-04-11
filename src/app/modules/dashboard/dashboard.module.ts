import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentHeaderModule } from '../student-header/student-header.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { BorrowedItemsComponent } from './borrowed-items/borrowed-items.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';


import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ContentTabsComponent } from './content-tabs/content-tabs.component';
import { DashboardReedsComponent } from './dashboard-reeds/dashboard-reeds.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardOicComponent } from './dashboard-oic/dashboard-oic.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AnnouncementsComponent,
    BorrowedItemsComponent,
    ContentTabsComponent,
    DashboardReedsComponent,
    DashboardFacultyComponent,
    DashboardOicComponent,
    DashboardAdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentHeaderModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DashboardModule { }
