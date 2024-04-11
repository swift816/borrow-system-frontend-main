import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StudentHeaderModule } from '../student-header/student-header.module';
import { HistoryRoutingModule } from './history-routing.module';
import { HistoryStudentComponent } from './history-student/history-student.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HistoryReedsComponent } from './history-reeds/history-reeds.component';
@NgModule({
  declarations: [
    HistoryStudentComponent,
    HistoryReedsComponent
  ],
  imports: [
    CommonModule,
    HistoryRoutingModule,
    StudentHeaderModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    MatListModule
  ],
})
export class HistoryModule { }
