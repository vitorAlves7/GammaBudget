import { TestBed } from '@angular/core/testing';

import { AlertsService } from './alerts.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AlertsService', () => {
  let service: AlertsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [AlertsService]
    });
    service = TestBed.inject(AlertsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
