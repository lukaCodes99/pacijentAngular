import { Component } from '@angular/core';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient/patient.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber', 'actions'];
  dataSource: BehaviorSubject<Patient[]> = new BehaviorSubject<Patient[]>([]);

  constructor(private patientService: PatientService, public dialog: MatDialog) { }

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
      data: { message: `Jeste li sigurni da želite izbrisati pacijenta ${patient.firstName} ${patient.lastName}?`, confirmText: 'Izbriši', cancelText: 'Odustani' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.patientService.deletePatient(patient).subscribe(_ => {
          const prev = this.dataSource.getValue();
          const index = prev.findIndex(e => e.id === patient.id);
          if (index > -1) {
            prev.splice(index, 1);
            this.dataSource.next(prev);
          }
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
}
