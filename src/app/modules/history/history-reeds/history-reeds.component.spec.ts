import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryReedsComponent } from './history-reeds.component';

describe('HistoryReedsComponent', () => {
  let component: HistoryReedsComponent;
  let fixture: ComponentFixture<HistoryReedsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryReedsComponent]
    });
    fixture = TestBed.createComponent(HistoryReedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
