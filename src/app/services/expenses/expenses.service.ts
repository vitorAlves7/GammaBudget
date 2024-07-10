import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
<<<<<<< HEAD
import { environment } from '../../../environments/environment';
import { Expense } from '../../types/expense-type';
=======
import { environment } from '../../../environments/environment.prod';
>>>>>>> 2e7984280e63a5d6be1dec93115991ec676af44b

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private apiUrl: string = `${environment.apiBaseUrl}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getExpensesList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.expensesList}/${this.getUserId()}/`,this.getHttpOptions());
  }

  getExpenseDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.expenseDetail}/${this.getUserId()}/${id}/`,this.getHttpOptions());
  }

  addItemToExpenses( item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.addItemToExpenses}/${this.getUserId()}/`, item,this.getHttpOptions());
  }

  updateExpenseItem( id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${environment.apiEndpoints.updateExpenseItem}/${this.getUserId()}/${id}/`, item,this.getHttpOptions());
  }

  deleteExpenseItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteExpenseItem}/${this.getUserId()}/${id}/`,this.getHttpOptions());
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  private getUserId(){
    const user = localStorage.getItem("user")
    if(user){
      const userId = JSON.parse(user);

      return userId.id;
    } else {
      return environment.userId;
    }
  }


}

