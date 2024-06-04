import { TestBed } from '@angular/core/testing';

import { IncomingService } from './incoming-service';

describe('ApiServiceService', () => {
  let service: IncomingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
