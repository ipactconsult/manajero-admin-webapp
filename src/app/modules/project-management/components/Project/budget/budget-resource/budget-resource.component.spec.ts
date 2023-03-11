import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetResourceComponent } from './budget-resource.component';

describe('BudgetResourceComponent', () => {
  let component: BudgetResourceComponent;
  let fixture: ComponentFixture<BudgetResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BudgetResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
