import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { AuthService } from '../service/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    public dialog: MatDialog, 
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.openDialog();
  }

  openDialog(): void {
    // This method will open the dialog
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '400px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.login(result).subscribe(_ => {
          this.router.navigate(['/administracija-tretmana']);
          console.log('Login successful');
        });
    };
    });
  }

}
