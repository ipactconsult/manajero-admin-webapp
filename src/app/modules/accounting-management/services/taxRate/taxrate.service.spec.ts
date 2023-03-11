import { TestBed } from '@angular/core/testing';

import { TaxrateService } from './taxrate.service';

describe('TaxrateService', () => {
  let service: TaxrateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaxrateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
