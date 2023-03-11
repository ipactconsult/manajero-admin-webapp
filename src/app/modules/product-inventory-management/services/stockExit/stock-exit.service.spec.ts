import { TestBed } from '@angular/core/testing';

import { StockExitService } from './stock-exit.service';

describe('StockExitService', () => {
  let service: StockExitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockExitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
