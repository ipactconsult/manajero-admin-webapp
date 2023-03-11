import { TestBed } from '@angular/core/testing';

import { ResponsibiltyCustomerService } from './responsibilty-customer.service';

describe('ResponsibiltyCustomerService', () => {
  let service: ResponsibiltyCustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResponsibiltyCustomerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
