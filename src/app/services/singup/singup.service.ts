import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: "root"
})
export class AuthService {

	constructor(private _http: HttpClient) { }


	createUser(useremail: string, password: string) {

        const response = this._http
        .post(`${ environment.apiUrl }user/register`,
            {
                email: useremail,
                password: password,
            }
        );
        console.log(response);
        return response
    }

}