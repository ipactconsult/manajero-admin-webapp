import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditPaymentListComponent } from './credit-payment-list.component';

describe('CreditPaymentListComponent', () => {
  let component: CreditPaymentListComponent;
  let fixture: ComponentFixture<CreditPaymentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditPaymentListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreditPaymentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
