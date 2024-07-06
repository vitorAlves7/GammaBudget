import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UpcomingExpensesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExpensesService] 

    });
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
