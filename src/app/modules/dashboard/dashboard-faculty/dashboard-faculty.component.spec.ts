import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardFacultyComponent } from './dashboard-faculty.component';

describe('DashboardFacultyComponent', () => {
  let component: DashboardFacultyComponent;
  let fixture: ComponentFixture<DashboardFacultyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardFacultyComponent]
    });
    fixture = TestBed.createComponent(DashboardFacultyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
