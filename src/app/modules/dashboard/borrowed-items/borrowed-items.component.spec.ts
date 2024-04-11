import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedItemsComponent } from './borrowed-items.component';

describe('BorrowedItemsComponent', () => {
  let component: BorrowedItemsComponent;
  let fixture: ComponentFixture<BorrowedItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorrowedItemsComponent]
    });
    fixture = TestBed.createComponent(BorrowedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
