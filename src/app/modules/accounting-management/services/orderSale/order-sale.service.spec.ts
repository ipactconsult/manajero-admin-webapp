import { TestBed } from '@angular/core/testing';

import { OrderSaleService } from './order-sale.service';

describe('OrderSaleService', () => {
  let service: OrderSaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderSaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
