import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Injectable({
    providedIn: 'root'
})
export class NurseAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.checkLogin();
    }

    checkLogin(): Observable<boolean> {
        return this.authService.getCurrentUser().pipe(
            map((user: any) => {
                if (user) {
                    const isUserNurse = this.authService.isRoleNurse();
                    const isUserHeadNurse = this.authService.isRoleHeadNurse();
                    const isUserAdmin = this.authService.isRoleAdmin();
                    if (isUserAdmin || isUserHeadNurse || isUserNurse) {
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