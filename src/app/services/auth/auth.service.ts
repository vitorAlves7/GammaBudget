import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { switchMap, map, retry } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment'


@Injectable({
  providedIn: "root"
})
export class AuthService {

	constructor(private _http: HttpClient, private userService: UserService) { }


    auth(user: any) {
		return this._http.post<any>(`${ environment.apiUrl }auth`, {email: user.email, password: user.password})
        .subscribe({
            next: (response) => {
                {
                console.log('response = ', response);
                this.createToken(user.email, user.password)
                .subscribe({
                    next: (dataToken: any) => {
                        localStorage.setItem('user', JSON.stringify(response));
                        localStorage.setItem('token', dataToken.access_token);
                        user.token = dataToken.access_token;
                        console.log('user = ', user)
                    }, 
                    error: (error: any) => {
                        console.log('There was an error in retrieving data from the server', error);
                    }
                })
            }
            },
            error: (error: any) => {
                console.log('There was an error in retrieving data from the server', error);
            }
        });
	}

	createToken(usernameToken: string, passwordToken: string) {

        const response = this._http
        .post(`${ environment.apiUrl }o/token/`,
            {
                client_id: environment.clientId,
                client_secret: environment.clientSecret,
                grant_type: environment.grantType,
                username: usernameToken,
                password: passwordToken,
            }
        );
        console.log(response);
        return response
    }

    refreshToken() {
        let refreshToken = '';
        const token = JSON.parse(localStorage.getItem('token') || '{}');
        if (token.hasOwnProperty('refresh_token')) {
            refreshToken = token.refresh_token;
        }

        return this._http
            .post(`${ environment.apiUrl }o/token/`,
                {
                    refresh_token: refreshToken,
                }
            ).pipe(
                map(response => {
                    localStorage.setItem('token', JSON.stringify(response));
                    return response;
                })
            );
    }

    checkHasLoggedUser() {
        return this.userService.isLogged();
    }

    logout() {
        localStorage.clear();
    }

}