import { TestBed } from '@angular/core/testing';

import { LeaveCounterService } from './leave-counter.service';

describe('LeaveCounterService', () => {
  let service: LeaveCounterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveCounterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
