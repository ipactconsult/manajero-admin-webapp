import { TestBed } from '@angular/core/testing';

import { RentatlRequestService } from './rentatl-request.service';

describe('RentatlRequestService', () => {
  let service: RentatlRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RentatlRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
