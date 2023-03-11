import { TestBed } from '@angular/core/testing';

import { AreService } from './are.service';

describe('AreService', () => {
  let service: AreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
