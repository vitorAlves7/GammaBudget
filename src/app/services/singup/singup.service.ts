import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment'
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: "root"
})
export class SingUpService {

	constructor(private _http: HttpClient) { }


	createUser(useremail: string, password: string) {
        return this._http
        .post<any>(`${ environment.apiUrl }user/register`,
            {
                email: useremail,
                password: password,
            }
        ).pipe(map(response =>
            response
        ))
    }
}