import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) { }

  index(queryParams:string = "") {
    if(queryParams != "") {
      queryParams = "?search=" + queryParams;
    }
    return this._http.get(`${ environment.apiUrl }user/list${ queryParams}`);
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user;
  }

  isLogged() {
    return Object.keys(this.getUser()).length !== 0;
  }
}