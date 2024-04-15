import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { AdminHeaderModule } from '../admin-header/admin-header.module';
import { HeaderModule } from '../header/header.module';
import { ReadsHeaderModule } from '../reads-header/reads-header.module';
import { StudentHeaderModule } from '../student-header/student-header.module';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { BorrowedItemsComponent } from './borrowed-items/borrowed-items.component';
import { ContentTabsComponent } from './content-tabs/content-tabs.component';
import { DashboardAdminComponent } from './dashboard-admin/dashboard-admin.component';
import { DashboardFacultyComponent } from './dashboard-faculty/dashboard-faculty.component';
import { DashboardInstructorComponent } from './dashboard-instructor/dashboard-instructor.component';
import { DashboardOicComponent } from './dashboard-oic/dashboard-oic.component';
import { DashboardReedsComponent } from './dashboard-reeds/dashboard-reeds.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AnnouncementsComponent,
    BorrowedItemsComponent,
    ContentTabsComponent,
    DashboardReedsComponent,
    DashboardFacultyComponent,
    DashboardOicComponent,
    DashboardAdminComponent,
    DashboardInstructorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    StudentHeaderModule,
    ReadsHeaderModule,
    MatTabsModule,
    MatButtonModule,
    MatIconModule,
    AdminHeaderModule,
    HeaderModule
  ]
})
export class DashboardModule { }
