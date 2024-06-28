import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TermsServiceService {
  


  private apiUrl: string = `${environment.apiUrlTerms}`;

  constructor(private http: HttpClient) { }

  generatePrivacyPolicy(projectName: string, contactEmail: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('project_name', projectName);
    body.set('contact_email', contactEmail);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(this.apiUrl, body.toString(), { headers , responseType: "arraybuffer"});
  }
}
