import { TestBed } from '@angular/core/testing';

import { LitigeService } from './litige.service';

describe('LitigeService', () => {
  let service: LitigeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LitigeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
