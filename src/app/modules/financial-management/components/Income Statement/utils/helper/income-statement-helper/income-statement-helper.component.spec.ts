import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStatementHelperComponent } from './income-statement-helper.component';

describe('IncomeStatementHelperComponent', () => {
  let component: IncomeStatementHelperComponent;
  let fixture: ComponentFixture<IncomeStatementHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeStatementHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeStatementHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
