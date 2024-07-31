import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

import { Router } from "@angular/router";
import { AuthService } from '../service/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    
    private isRefreshing = false;
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        
        const token = localStorage.getItem('token');
        if (token) {
            const decoded: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            if (decoded.exp < currentTime && !this.isRefreshing) {
                console.log("Token has expired, refreshing token...");
                this.isRefreshing = true;
                return this.authService.refreshToken().pipe(
                    switchMap(response => {
                        this.isRefreshing = false;
                        if (response) {
                            localStorage.setItem('token', response.accessToken);
                            localStorage.setItem('refreshToken', response.refreshToken);
                            req = req.clone({
                                setHeaders: {
                                    Authorization: `Bearer ${response.accessToken}`
                                }
                            });
                        }
                        return next.handle(req);
                    }), catchError(error => {
                        this.isRefreshing = false;
                        console.error('Refresh token failed:', error);
                        return this.logoutUser();
                    })
                );
            }
            return next.handle(req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            }));
        }
        return next.handle(req);
    }
    private logoutUser(): Observable<HttpEvent<any>> {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.router.navigate(['/login']);
        return throwError(() => new Error('Session expired, user logged out.'));
    }
}
