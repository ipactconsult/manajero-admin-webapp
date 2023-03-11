import { TestBed } from '@angular/core/testing';

import { ActivitiesStatusService } from './activities-status.service';

describe('ActivitiesStatusService', () => {
  let service: ActivitiesStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActivitiesStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
