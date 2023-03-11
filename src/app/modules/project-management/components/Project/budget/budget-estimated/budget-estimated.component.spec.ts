import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetEstimatedComponent } from './budget-estimated.component';

describe('BudgetEstimatedComponent', () => {
  let component: BudgetEstimatedComponent;
  let fixture: ComponentFixture<BudgetEstimatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetEstimatedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetEstimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
