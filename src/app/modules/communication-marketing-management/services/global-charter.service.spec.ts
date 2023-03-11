import { TestBed } from '@angular/core/testing';

import { GlobalCharterService } from './global-charter.service';

describe('GlobalCharterService', () => {
  let service: GlobalCharterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCharterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
