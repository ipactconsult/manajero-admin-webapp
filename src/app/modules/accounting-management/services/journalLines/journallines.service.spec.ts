import { TestBed } from '@angular/core/testing';

import { JournallinesService } from './journallines.service';

describe('JournallinesService', () => {
  let service: JournallinesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JournallinesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
