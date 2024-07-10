import { Component } from '@angular/core';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient/patient.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PatientDialogComponent } from '../patient-dialog/patient-dialog.component';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber'];
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
