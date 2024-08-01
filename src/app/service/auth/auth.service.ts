import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loginUrl = 'http://localhost:8082/auth/login';
  private logoutUrl = 'http://localhost:8082/auth/logout';
  private refreshTokenUrl = 'http://localhost:8082/auth/refreshToken';
  private decodedToken: any;

  constructor(private http: HttpClient) {
    this.decodeToken();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private decodeToken(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        this.decodedToken = jwtDecode(token);
        console.log('Decoded token', this.decodedToken);
      } catch (error) {
        console.error('Invalid token', error);
        this.decodedToken = null;
      }
    } else {
      console.error('No token found');
      this.decodedToken = null;
    }
  }

  login(credentials: {username: string, password: string}): Observable<any> {
    return this.http.post<any>(this.loginUrl, credentials, this.httpOptions).pipe(
      tap(response => {
        if (response) {
          localStorage.setItem('token', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          this.decodeToken(); // Decode the new token
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
      return of(null);
    }
    const urlWithParams = `${this.logoutUrl}?token=${refreshToken}`;
    return this.http.post<any>(urlWithParams, {}, this.httpOptions).pipe(
      tap(response => {
        if (response && response.message === "User logged out successfully") {
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          this.decodedToken = null; // Clear the decoded token
        } else {
          console.error('Logout failed');
        }
      })
    );
  }

  getCurrentUser(): Observable<any> {
    if (this.decodedToken) {
      return of(this.decodedToken.sub);
    } else {
      return of(null);
    }
  }

  isRoleAdmin(): boolean {
    return this.decodedToken ? this.decodedToken.roles.includes('admin') : false;
  }

  isRoleHeadNurse(): boolean {
    return this.decodedToken ? this.decodedToken.roles.includes('head_nurse') : false;
  }

  isRoleNurse(): boolean {
    return this.decodedToken ? this.decodedToken.roles.includes('nurse') : false;
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      console.error('No refresh token found');
      return of(null);
    }
    const body = { refreshToken: refreshToken, expiredAccessToken: localStorage.getItem('token') };
    return this.http.post<any>(`${this.refreshTokenUrl}`, body).pipe(
      tap(response => {
        if (response && response.tokens) {
          localStorage.setItem('token', response.tokens.accessToken);
          localStorage.setItem('refreshToken', response.tokens.refreshToken);
          this.decodeToken(); // Decode the new token
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