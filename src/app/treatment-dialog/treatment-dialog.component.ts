import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Treatment } from '../model/treatment';

@Component({
  selector: 'app-treatment-dialog',
  templateUrl: './treatment-dialog.component.html',
  styleUrl: './treatment-dialog.component.css',
})
export class TreatmentDialogComponent {
  public data: Treatment = {};

  constructor(public dialogRef: MatDialogRef<TreatmentDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
