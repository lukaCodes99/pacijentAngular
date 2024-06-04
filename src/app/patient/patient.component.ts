import { Component } from '@angular/core';
import { Patient } from '../model/patient';
import { PatientService } from '../service/patient/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber'];
  dataSource: Patient[] = [];

  constructor(private patientService: PatientService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.patientService.getPatients().subscribe(patients => {
      this.dataSource = patients;
    });
  }
}
