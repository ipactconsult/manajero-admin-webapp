import { TestBed } from '@angular/core/testing';

import { ProductsSalesService } from './products-sales.service';

describe('ProductsSalesService', () => {
  let service: ProductsSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductsSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
