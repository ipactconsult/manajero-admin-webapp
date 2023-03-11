import { TestBed } from '@angular/core/testing';

import { RecommendedTrainingService } from './recommended-training.service';

describe('RecommendedTrainingService', () => {
  let service: RecommendedTrainingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecommendedTrainingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
