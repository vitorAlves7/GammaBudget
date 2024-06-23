import { TestBed } from '@angular/core/testing';

import { ExpenseCategoryService } from './expense-category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExpenseCategoryService', () => {
  let service: ExpenseCategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [ExpenseCategoryService]
    });
    service = TestBed.inject(ExpenseCategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
