import { TestBed } from '@angular/core/testing';

import { IncomingCategoryService } from './incoming-category.service';

describe('IncomingCategoryService', () => {
  let service: IncomingCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncomingCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
