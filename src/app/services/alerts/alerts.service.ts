import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private apiUrl: string = `${environment.apiBaseUrl}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient) {}

  getAlertList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${environment.apiEndpoints.listAlerts}/${this.getUserId()}/`,this.getHttpOptions());
  }


  addAlert( item: any): Observable<any> {
    item.user_id= this.getUserId();
    item.user_email = this.getUserEmail();
    return this.http.post<any>(`${this.apiUrl}/${environment.apiEndpoints.createAlert}/${this.getUserId()}/`, item,this.getHttpOptions());
  }


  deleteAlert(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${environment.apiEndpoints.deleteAlert}/${this.getUserId()}/${id}/`,this.getHttpOptions());
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
  private getUserEmail(){
    const user = localStorage.getItem("email")
    if(user){
      const userId = JSON.parse(user);
      return userId.email;
    } else {
      return environment.email;
    }
  }

}
