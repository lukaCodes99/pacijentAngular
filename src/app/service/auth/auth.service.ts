import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loginUrl = 'http://localhost:8082/auth/login';
private logoutUrl = 'http://localhost:8082/auth/logout';
private refreshTokenUrl = 'https://localhost:8082/auth/refreshToken';

constructor(private http: HttpClient) { }

httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

login(credentials: {username: string, password: string}): Observable<any> {
  return this.http.post<any>(this.loginUrl, credentials, this.httpOptions).pipe(
    
      tap(response => {
        console.log('Login successful')
        if (response) {
          console.log('Login successful22222'),
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          console.log("Access token", response.accessToken);
          console.log("Refresh token", response.refreshToken);
          
        } else {
          console.error('Token not found in response');
        }
      })
    );
  }	
  
  logout(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return of(null); // Return an observable with null value to avoid further processing
    }
    console.log('Logout called1');
    const urlWithParams = `${this.logoutUrl}?token=${refreshToken}`;
    return this.http.post<any>(urlWithParams, {}, this.httpOptions).pipe(
      tap(response => {
        console.log('Logout called2');
        if (response && response.message === "User logged out successfully") {
          console.log('Logout called3');
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
        } else {
          console.error('Logout failed');
        }
      })
    );
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
    }
    const body = { refreshToken: refreshToken, expiredAccessToken: localStorage.getItem('token') };
    return this.http.post<any>(`${this.refreshTokenUrl}`, body).pipe(
      tap(response => {
        if (response && response.tokens) {
          localStorage.setItem('token', response.tokens.accessToken);
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
        }
      })
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(operation);
    console.error(error);
    return of(result as T);
    };
  }
}
