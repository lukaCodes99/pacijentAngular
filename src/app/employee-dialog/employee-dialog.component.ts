import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-dialog',
  templateUrl: './employee-dialog.component.html',
  styleUrl: './employee-dialog.component.css'
})
export class EmployeeDialogComponent {

  public data: Employee = {};

  roles = [
    {value: 'admin', viewValue: 'Administrator'},
    {value: 'head_nurse', viewValue: 'Glavna medicinska sestra'},
    {value: 'nurse', viewValue: 'Medicinska sestra'},
    {value: 'doctor', viewValue: 'Doktor'},
  ];

  constructor(public dialogRef: MatDialogRef<EmployeeDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
