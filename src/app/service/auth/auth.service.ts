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


  getCurrentUser(): Observable<any> {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return of(null); // Return an observable with null value to avoid further processing
    }
    try {
      const decodedToken = jwtDecode(token);
      console.log('Decoded token', decodedToken);
      console.log('Decoded token sub', decodedToken.sub);
      return of(decodedToken.sub); // Return the decoded token as an observable
    } catch (error) {
      console.error('Invalid token', error);
      return of(null); // Return an observable with null value if token is invalid
    }
  }

  isRoleAdmin(): boolean {
    const token = localStorage.getItem('token');
    console.log('Token11', token);
    if(token){
      console.log('Token22', token);
      const decoded: any = jwtDecode(token);
      console.log('Decoded', decoded);
  
      // Check if 'roles' is an array
      console.log('Is roles an array?', Array.isArray(decoded.roles));
      console.log('Roles array:', decoded.roles);
  
      // Check if 'admin' exists in the roles array
      const hasAdminRole = decoded.roles.includes('admin');
      
      return hasAdminRole;
    }
    else return false;
  }
  

  isRoleHeadNurse(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      const decoded: any = jwtDecode(token);
      return decoded.roles.includes('head_nurse');
    }
    else return false;
  }

  isRoleNurse(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      const decoded: any = jwtDecode(token);
      return decoded.roles.includes('nurse');
    }
    else return false;
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
