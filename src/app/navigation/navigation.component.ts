import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  username?: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.currentUser().subscribe(user => {
      this.username = user ? user : 'Guest';
    });
  }

  showUsers(): boolean{
    return this.authService.isRoleAdmin();
  }

  showTreatments(): boolean{
    return (this.authService.isRoleAdmin() || this.authService.isRoleHeadNurse());
  }

  currentUser(): Observable<any> {
    return this.authService.getCurrentUser();
  }

}
