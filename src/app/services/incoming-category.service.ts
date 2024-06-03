import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomingCategoryService {

  private apiUrl: string = `${environment.apiBaseUrl}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.listCategoriesIncoming}/`,this.getHttpOptions());
  }
  
  private getHttpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
}
