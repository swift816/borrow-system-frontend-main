import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryReedsComponent } from './history-reeds/history-reeds.component';
import { HistoryStudentComponent } from './history-student/history-student.component';

const routes: Routes = [
  {
    path: 'student',
    component: HistoryStudentComponent
  },
  {
    path: 'reeds',
    component: HistoryReedsComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistoryRoutingModule { }
