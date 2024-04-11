import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterItemsComponent } from './filter-items.component';

describe('FilterItemsComponent', () => {
  let component: FilterItemsComponent;
  let fixture: ComponentFixture<FilterItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterItemsComponent]
    });
    fixture = TestBed.createComponent(FilterItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
