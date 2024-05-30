import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expense } from '../../types/expense-type';

@Injectable({
  providedIn: 'root'
})
export class UpcomingExpensesService {

  private apiUrl: string = `${environment.apiBaseUrl}/expenses`; 

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(this.apiUrl);
  }

}

