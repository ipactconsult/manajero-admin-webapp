import { TestBed } from '@angular/core/testing';

import { FlowRequestService } from './flow-request.service';

describe('FlowRequestService', () => {
  let service: FlowRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FlowRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
