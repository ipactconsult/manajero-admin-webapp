import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashFlowRiskComponent } from './cash-flow-risk.component';

describe('CashFlowRiskComponent', () => {
  let component: CashFlowRiskComponent;
  let fixture: ComponentFixture<CashFlowRiskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashFlowRiskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CashFlowRiskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
