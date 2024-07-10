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
      console.log('The dialog was closed');
      const prev = this.dataSource.getValue();
      result.id = prev.length + 1;
      prev.push(result);
      this.dataSource.next(prev);
    })
  }
}
