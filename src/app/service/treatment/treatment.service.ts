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
  // getTreatments(): Observable<Treatment[]> {
  //   const treatments: Treatment[] = [
  //     { id: 1, name: 'Treatment 1', price: 100 },
  //     { id: 2, name: 'Treatment 2', price: 200 },
  //     { id: 3, name: 'Treatment 3', price: 300 },
  //     { id: 4, name: 'Treatment 4', price: 400 },
  //     { id: 5, name: 'Treatment 5', price: 500 },
  //     { id: 6, name: 'Treatment 6', price: 600 },
  //   ];
  
  //   return of(treatments).pipe(
  //     tap(_ => console.log('fetched treatments'))
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
export { Treatment };