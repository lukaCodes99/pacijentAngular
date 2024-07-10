import { Component } from '@angular/core';
import { Patient } from '../model/patient';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-patient-dialog',
  templateUrl: './patient-dialog.component.html',
  styleUrl: './patient-dialog.component.css'
})
export class PatientDialogComponent {

  public data: Patient = {};

  constructor(public dialogRef: MatDialogRef<PatientDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
