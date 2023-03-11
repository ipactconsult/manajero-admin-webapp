import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetResourceTableComponent } from './budget-resource-table.component';

describe('BudgetResourceTableComponent', () => {
  let component: BudgetResourceTableComponent;
  let fixture: ComponentFixture<BudgetResourceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetResourceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetResourceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
