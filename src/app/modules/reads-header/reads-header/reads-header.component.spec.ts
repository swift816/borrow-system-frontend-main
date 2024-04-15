import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadsHeaderComponent } from './reads-header.component';

describe('ReadsHeaderComponent', () => {
  let component: ReadsHeaderComponent;
  let fixture: ComponentFixture<ReadsHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReadsHeaderComponent]
    });
    fixture = TestBed.createComponent(ReadsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
