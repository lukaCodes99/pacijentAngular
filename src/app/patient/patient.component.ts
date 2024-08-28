import { Component } from '@angular/core';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient/patient.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'actions'];
  dataSource: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  constructor(
    private patientService: PatientService, 
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.patientService.getPatients().subscribe(patients => {
      this.dataSource.next(patients);
    });
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  openDeleteConfirmDialog(patient: Patient): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Jeste li sigurni da želite izbrisati pacijenta ${patient.firstName} ${patient.lastName}?`, 
              confirmText: 'Izbriši', cancelText: 'Odustani' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.patientService.deletePatient(patient).subscribe({
          next: (response: any) => {
            if (response.status === 204) {
              // Patient successfully deleted, update the dataSource
              const prev = this.dataSource.getValue();
              const index = prev.findIndex(e => e.id === patient.id);
              if (index > -1) {
                prev.splice(index, 1);
                this.dataSource.next(prev);
              }
            } else {
              this.snackBar.open('Nemate prava za izvršenje ove akcije', 'Close', {
                duration: 5000,
              });
            }
          },
          error: err => {
            this.snackBar.open('Nemate prava za izvršenje ove akcije', 'Close', {
              duration: 5000,
            });
          }
        });
      }
    });
  }    

  openEditingDialog(patient: Patient) {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '30%'
    });
    dialogRef.componentInstance.data = patient;

    dialogRef.afterClosed().subscribe((result) => {
      // Check if result is not null or undefined
      /*
      (assuming that clicking the confirm button returns a result, and canceling the dialog returns null or undefined)
      */
      if (result !== null && result !== undefined && result !== '') {
        this.patientService.updatePatient(result).subscribe((newPatient) => {
          console.log(`updated patient w/ id=${newPatient.id}`); // Fixed template string syntax
          const prev = this.dataSource.getValue();
          //prev.push(newPatient);
          this.dataSource.next(prev);
        });
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PatientDialogComponent, {
      width: '30%'    
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result !== null && result !== undefined) {
        this.patientService.addPatient(result).subscribe((newPatient) => {
          console.log(`added patient w/ id=${newPatient.id}`);
          const prev = this.dataSource.getValue();
          prev.push(newPatient);
          this.dataSource.next(prev);
        });
      }
    });
  }

  openGmail(phoneNumber: string): void {
    phoneNumber = 'valerijakelenic8@gmail.com';
    const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${phoneNumber}`;
    window.open(mailtoLink, '_blank');
  }

}
