import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInstructorComponent } from './dashboard-instructor.component';

describe('DashboardInstructorComponent', () => {
  let component: DashboardInstructorComponent;
  let fixture: ComponentFixture<DashboardInstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardInstructorComponent]
    });
    fixture = TestBed.createComponent(DashboardInstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
