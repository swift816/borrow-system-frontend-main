import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOicComponent } from './dashboard-oic.component';

describe('DashboardOicComponent', () => {
  let component: DashboardOicComponent;
  let fixture: ComponentFixture<DashboardOicComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardOicComponent]
    });
    fixture = TestBed.createComponent(DashboardOicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
