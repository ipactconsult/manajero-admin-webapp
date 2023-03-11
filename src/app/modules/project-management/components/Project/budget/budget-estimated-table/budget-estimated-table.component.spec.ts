import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEstimatedTableComponent } from './budget-estimated-table.component';

describe('BudgetEstimatedTableComponent', () => {
  let component: BudgetEstimatedTableComponent;
  let fixture: ComponentFixture<BudgetEstimatedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEstimatedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEstimatedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
