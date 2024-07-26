import { Component } from '@angular/core';
import { Login } from '../model/login';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  public data: Login = {};

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
