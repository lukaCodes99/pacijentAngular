import { Component } from '@angular/core';
import {  LoginRequest } from '../model/loginRequest';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrl: './login-dialog.component.css'
})
export class LoginDialogComponent {

  public data: LoginRequest = {};

  constructor(public dialogRef: MatDialogRef<LoginDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
