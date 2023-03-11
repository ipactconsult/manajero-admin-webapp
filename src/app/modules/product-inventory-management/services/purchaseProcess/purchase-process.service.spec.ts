import { TestBed } from '@angular/core/testing';

import { PurchaseProcessService } from './purchase-process.service';

describe('PurchaseProcessService', () => {
  let service: PurchaseProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PurchaseProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
