import { TestBed } from '@angular/core/testing';

import { ExpensesService } from './expenses.service';

describe('UpcomingExpensesService', () => {
  let service: ExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
