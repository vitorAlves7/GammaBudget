import { TestBed } from '@angular/core/testing';

import { UpcomingExpensesService } from './upcoming-expenses.service';

describe('UpcomingExpensesService', () => {
  let service: UpcomingExpensesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpcomingExpensesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
