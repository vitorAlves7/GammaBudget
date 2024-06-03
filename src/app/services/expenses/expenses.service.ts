import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Expense } from '../../types/expense-type';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl: string = `${environment.apiBaseUrl}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getExpensesList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.expensesList}/${environment.userId}/`,this.getHttpOptions());
  }

  getExpenseDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.expenseDetail}/${environment.userId}/${id}/`,this.getHttpOptions());
  }

  addItemToExpenses( item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.addItemToExpenses}/${environment.userId}/`, item,this.getHttpOptions());
  }

  updateExpenseItem( id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${environment.apiEndpoints.updateExpenseItem}/${environment.userId}/${id}/`, item,this.getHttpOptions());
  }

  deleteExpenseItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteExpenseItem}/${environment.userId}/${id}/`,this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


}

