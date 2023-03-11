import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualBudgetComponent } from './annual-budget.component';

describe('AnnualBudgetComponent', () => {
  let component: AnnualBudgetComponent;
  let fixture: ComponentFixture<AnnualBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnnualBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnualBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
