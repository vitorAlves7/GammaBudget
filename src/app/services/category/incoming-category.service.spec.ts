import { TestBed } from '@angular/core/testing';

import { IncomingCategoryService } from './incoming-category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IncomingCategoryService', () => {
  let service: IncomingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [IncomingCategoryService]
    });
    service = TestBed.inject(IncomingCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
