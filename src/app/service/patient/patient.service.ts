import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Patient } from '../../model/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private patientUrl = 'http://localhost:8082/patient';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    

  getPatients(): Observable<Patient[]> {
    return this.http.get<Patient[]>(`${this.patientUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched Patients')),
        catchError(this.handleError<Patient[]>('getPatients', []))
      );
  }

  addPatient(patient: Patient): Observable<Patient>{
    return this.http.post<Patient>(`${this.patientUrl}/save`, patient, this.httpOptions)
      .pipe(
        tap((newPatient: Patient) => console.log(`added patient w/ id=${newPatient.id}`)),
        catchError(this.handleError<Patient>('addPatient'))
      );
  }

  deletePatient(patient: Patient){
    const id = patient.id;
    const url = `${this.patientUrl}/delete/${id}`;
    return this.http.delete<Patient>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted patient id=${id}`)),
      catchError(this.handleError<Patient>('deletePatient'))
    );
  }

  // getPatients(): Observable<Patient[]> {
  //   const patients: Patient[] = [
  //     { id: 1, firstName: 'John', lastName: 'Doe', phoneNumber: '1234567890' },
  //     { id: 2, firstName: 'Jane', lastName: 'Doe', phoneNumber: '0987654321' },
  //     { id: 3, firstName: 'Bob', lastName: 'Smith', phoneNumber: '1122334455' },
  //     { id: 4, firstName: 'Alice', lastName: 'Johnson', phoneNumber: '5566778899' },
  //     { id: 5, firstName: 'Charlie', lastName: 'Brown', phoneNumber: '2233445566' },
  //     { id: 6, firstName: 'Eve', lastName: 'Green', phoneNumber: '9988776655' },
  //   ];
  
  //   return of(patients).pipe(
  //     tap(_ => console.log('fetched patients'))
  //   );
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(operation);
    console.error(error);
    return of(result as T);
    };
  }

  
}
export { Patient };

