import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryStudentComponent } from './history-student.component';

describe('HistoryStudentComponent', () => {
  let component: HistoryStudentComponent;
  let fixture: ComponentFixture<HistoryStudentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryStudentComponent]
    });
    fixture = TestBed.createComponent(HistoryStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
