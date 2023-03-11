import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectForExpenseTypeComponent } from './select-for-expense-type.component';

describe('SelectForExpenseTypeComponent', () => {
  let component: SelectForExpenseTypeComponent;
  let fixture: ComponentFixture<SelectForExpenseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectForExpenseTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectForExpenseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
