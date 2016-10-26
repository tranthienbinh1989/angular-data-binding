import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Configuration } from '../app.config';

@Injectable()
export class AuthenticationService {
    public token: string;
    private apiUrl: string;
    private headers: Headers;
    constructor(
        private http: Http,
        private config: Configuration,
    ) {
        // set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.apiUrl = this.config.serverWithApiUrl;
        this.headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.apiUrl + '/authenticate',
                JSON.stringify({ username: username, password: password }),
                { headers: this.headers }
            )
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let token = response.json() && response.json().token;
                console.log(token)
                if (token) {
                    // set token property
                    let user = response.json();
                    if (user && user.token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(user));
                    }
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('currentUser');
    }
}
