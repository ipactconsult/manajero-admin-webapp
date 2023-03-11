import { TestBed } from '@angular/core/testing';

import { ReplenishmentProcessService } from './replenishment-process.service';

describe('ReplenishmentProcessService', () => {
  let service: ReplenishmentProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReplenishmentProcessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
