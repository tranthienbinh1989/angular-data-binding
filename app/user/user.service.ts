import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Configuration } from '../app.config';
import { User } from './user';

@Injectable()
export class UserService {
  private loggedIn = false;

  constructor(
      private http: Http,
      private config: Configuration,
      ) {
    this.loggedIn = !!localStorage.getItem('auth_token');
  }
  private apiUrl = this.config.serverWithApiUrl;
  private headers = new Headers({'Content-Type': 'application/json', 'Accept': 'application/json'});

  login(email: string, password: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
        this.apiUrl + '/authenticate',
        JSON.stringify({ email, password }), 
        { headers }
      )
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          localStorage.setItem('auth_token', res.auth_token);
          this.loggedIn = true;
        }

        return res.success;
      });
  }
  
  logout() {
    localStorage.removeItem('auth_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  create(user: User): Promise<User> {
    return this.http
      .post(this.apiUrl + '/authenticate/register', JSON.stringify(user), {headers: this.headers})
      .toPromise()
      .then(res => res.json() as User)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}