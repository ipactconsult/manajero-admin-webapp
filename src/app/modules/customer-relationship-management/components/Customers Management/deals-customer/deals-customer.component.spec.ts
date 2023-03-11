import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealsCustomerComponent } from './deals-customer.component';

describe('DealsCustomerComponent', () => {
  let component: DealsCustomerComponent;
  let fixture: ComponentFixture<DealsCustomerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealsCustomerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DealsCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
