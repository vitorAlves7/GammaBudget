import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomingService {
  
  private apiUrl: string = `${environment.apiBaseUrl}`;

  constructor(private http: HttpClient) {}

  getIncomingList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.incomingList}/${environment.userId}/`,this.getHttpOptions());
  }

  getIncomingDetail(userId: number, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.incomingDetail}/${userId}/${id}/`,this.getHttpOptions());
  }

  addItemToIncomingList(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.addItemToIncomings}/${environment.userId}/`, item,this.getHttpOptions());
  }

  updateIncomingListItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${environment.apiEndpoints.updateIncomingItem}/${environment.userId}/${id}/`, item,this.getHttpOptions());
  }

  deleteIncomingListItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteIncomingItem}/${environment.userId}/${id}/`,this.getHttpOptions());
  }


  private getHttpOptions() {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }
  

  

  
}