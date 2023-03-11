import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetsHelperComponent } from './budgets-helper.component';

describe('BudgetsHelperComponent', () => {
  let component: BudgetsHelperComponent;
  let fixture: ComponentFixture<BudgetsHelperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetsHelperComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetsHelperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
