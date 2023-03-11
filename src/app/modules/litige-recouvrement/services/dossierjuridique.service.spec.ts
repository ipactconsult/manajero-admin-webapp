import { TestBed } from '@angular/core/testing';

import { DossierjuridiqueService } from './dossierjuridique.service';

describe('DossierjuridiqueService', () => {
  let service: DossierjuridiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DossierjuridiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
