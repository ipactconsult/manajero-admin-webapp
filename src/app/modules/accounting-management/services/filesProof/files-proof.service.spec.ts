import { TestBed } from '@angular/core/testing';

import { FilesProofService } from './files-proof.service';

describe('FilesProofService', () => {
  let service: FilesProofService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilesProofService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
