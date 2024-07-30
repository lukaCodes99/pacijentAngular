import { Component } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { AuthService } from './service/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'pacijentEZ';
  isButtonDisabled = false;

  onToggleChange(event: MatSlideToggleChange) {
    console.log(event.checked); // This will log true if the toggle is checked, false otherwise
  }

  constructor(private router: Router, private authService: AuthService) {}

  isLoginRoute(): boolean {
    return this.router.url === '/login';
  }

  logout() {
    console.log('Logout button clicked');
    this.authService.logout().subscribe(response => {
      
      console.log('Logout successful');
      this.router.navigate(['/login']);
    });
  }

}