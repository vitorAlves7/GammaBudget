import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LimitService {

 


  private apiUrl: string = `${environment.apiBaseUrl}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getLimitList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.listLimit}/${this.getUserId()}/`,this.getHttpOptions());
  }

  addLimit( item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.addLimit}/${this.getUserId()}/`, item,this.getHttpOptions());
  }

  updateLimit( id: string, item: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${environment.apiEndpoints.updateLimit}/${this.getUserId()}/${id}/`, item,this.getHttpOptions());
  }

  deleteLimit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteLimit}/${this.getUserId()}/${id}/`,this.getHttpOptions());
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
