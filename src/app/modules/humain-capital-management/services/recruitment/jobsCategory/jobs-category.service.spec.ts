import { TestBed } from '@angular/core/testing';

import { JobsCategoryService } from './jobs-category.service';

describe('JobsCategoryService', () => {
  let service: JobsCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobsCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
