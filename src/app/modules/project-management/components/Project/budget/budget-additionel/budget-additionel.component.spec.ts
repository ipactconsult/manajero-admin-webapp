import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAdditionelComponent } from './budget-additionel.component';

describe('BudgetAdditionelComponent', () => {
  let component: BudgetAdditionelComponent;
  let fixture: ComponentFixture<BudgetAdditionelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAdditionelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetAdditionelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
