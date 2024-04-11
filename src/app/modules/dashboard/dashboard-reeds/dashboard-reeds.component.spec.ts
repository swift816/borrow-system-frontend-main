import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardReedsComponent } from './dashboard-reeds.component';


describe('DashboardReedsComponent', () => {
  let component: DashboardReedsComponent;
  let fixture: ComponentFixture<DashboardReedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashboardReedsComponent]
    });
    fixture = TestBed.createComponent(DashboardReedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
