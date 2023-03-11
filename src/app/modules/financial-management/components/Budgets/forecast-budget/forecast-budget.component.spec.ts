import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastBudgetComponent } from './forecast-budget.component';

describe('ForecastBudgetComponent', () => {
  let component: ForecastBudgetComponent;
  let fixture: ComponentFixture<ForecastBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastBudgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
