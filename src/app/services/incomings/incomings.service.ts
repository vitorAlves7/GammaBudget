import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomingsService {

  private apiUrl: string = `${environment.apiBaseUrl}`;
  private userData: string | null  = JSON.parse(localStorage.getItem('user') as string);
  

  constructor(private http: HttpClient) {
  }

  getIncomingList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.incomingList}/${this.getUserId()}/`,this.getHttpOptions());
  }

  getIncomingDetail(userId: number, id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.incomingDetail}/${userId}/${id}/`,this.getHttpOptions());
  }

  addItemToIncomingList(item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.addItemToIncomings}/${this.getUserId()}/`, item,this.getHttpOptions());
  }

  updateIncomingListItem(id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${environment.apiEndpoints.updateIncomingItem}/${this.getUserId()}/${id}/`, item,this.getHttpOptions());
  }

  deleteIncomingListItem(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteIncomingItem}/${this.getUserId()}/${id}/`,this.getHttpOptions());
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
