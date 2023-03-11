import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceInsightsComponent } from './finance-insights.component';

describe('FinanceInsightsComponent', () => {
  let component: FinanceInsightsComponent;
  let fixture: ComponentFixture<FinanceInsightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinanceInsightsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceInsightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
