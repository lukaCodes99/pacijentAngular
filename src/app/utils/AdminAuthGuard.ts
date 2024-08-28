import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable, of, map } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    
    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkLogin();
    }

    checkLogin(): Observable<boolean> {
        return this.authService.getCurrentUser().pipe(
            map((user: any) => {
                if (user) {
                    const isUserAdmin = this.authService.isRoleAdmin();
                    if (isUserAdmin) {
                        return true;
                    } else {
                        this.router.navigate(['/forbidden']);
                        return false;
                    }
                } else {
                    this.router.navigate(['/login']);
                    return false;
                }
            })
        );
    }
}