import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IncomingsService } from './incomings.service';

describe('IncomingsService', () => {
  let service: IncomingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Adicione HttpClientTestingModule aqui
      providers: [IncomingsService] // Fornece o IncomingsService explicitamente
    });
    service = TestBed.inject(IncomingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
