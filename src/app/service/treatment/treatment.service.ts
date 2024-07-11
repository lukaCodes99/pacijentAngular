import { Injectable } from '@angular/core';
import { Treatment } from '../../model/treatment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {
  private treatmentUrl = 'http://localhost:8082/treatment';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    

  getTreatments(): Observable<Treatment[]> {
    return this.http.get<Treatment[]>(`${this.treatmentUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched treatments')),
        catchError(this.handleError<Treatment[]>('getTreatments', []))
      );
  }

  addTreatment(treatment: Treatment): Observable<Treatment>{
    return this.http.post<Treatment>(`${this.treatmentUrl}/save`, treatment, this.httpOptions)
      .pipe(
        tap((newTreatment: Treatment) => console.log(`added treatment w/ id=${newTreatment.id}`)),
        catchError(this.handleError<Treatment>('addTreatment'))
      );
  }

  deleteTreatment(treatment: Treatment){
    const id = treatment.id;
    const url = `${this.treatmentUrl}/delete/${id}`;
    return this.http.delete<Treatment>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted treatment id=${id}`)),
      catchError(this.handleError<Treatment>('deleteTreatment'))
    );
  }

  updateTreatment(treatment: Treatment): Observable<any> {
    return this.http.put(`${this.treatmentUrl}/update`, treatment, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated treatment id=${treatment.id}`)),
        catchError(this.handleError<any>('updateTreatment'))
      );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
    console.error(operation);
    console.error(error);
    return of(result as T);
    };
  }
}
export { Treatment };