import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pacijent } from '../../model/pacijent';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacijentService {

  private pacijentiUrl = 'http://localhost:8082/patient';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    

  getPacijenti(): Observable<Pacijent[]> {
    return this.http.get<Pacijent[]>(`${this.pacijentiUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched pacijenti')),
        catchError(this.handleError<Pacijent[]>('getPacijenti', []))
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
export { Pacijent };

