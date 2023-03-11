import { TestBed } from '@angular/core/testing';

import { LoiService } from './loi.service';

describe('LoiService', () => {
  let service: LoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
