import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.baseAPIUrl;

  constructor(private readonly http:HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.baseUrl}/auth/signin`, {username: username, password: password})
      .pipe(
        map(result => {
          localStorage.setItem('access_token', result.token);
          return true;
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  public get loggedIn(): boolean {
    return (localStorage.getItem('access_token') !== null);
  }

  public getToken(): String{
    return localStorage.getItem('access_token');
  }
}
