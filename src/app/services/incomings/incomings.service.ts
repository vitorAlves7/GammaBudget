import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Incoming } from '../../types/incoming-type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IncomingsService {

  private apiUrl: string = `${environment.apiBaseUrl}/incomings`; 

  constructor(private http: HttpClient) {}

  getIncomings(): Observable<Incoming[]> {
    return this.http.get<Incoming[]>(this.apiUrl);
  }
}
