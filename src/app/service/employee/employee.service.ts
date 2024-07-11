import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { Employee } from '../../model/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl = 'http://localhost:8082/employee';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }
    

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.employeeUrl}/all`)
      .pipe(
        tap(_ => console.log('fetched employees')),
        catchError(this.handleError<Employee[]>('getEmployees', []))
      );
  }

  addEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${this.employeeUrl}/save`, employee, this.httpOptions)
      .pipe(
        tap((newEmployee: Employee) => console.log(`added employee w/ id=${newEmployee.id}`)),
        catchError(this.handleError<Employee>('addEmployee'))
      );
  }

  deleteEmployee(employee: Employee ){
    const id = employee.id;
    const url = `${this.employeeUrl}/delete/${id}`;
    return this.http.delete<Employee>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted employee id=${id}`)),
      catchError(this.handleError<Employee>('deleteEmployee'))
    );
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http.put(`${this.employeeUrl}/update`, employee, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
      );
  }


  // getEmployees(): Observable<Employee[]> {
  //   const employees: Employee[] = [
  //     { id: 1, firstName: 'John', lastName: 'Doe', username: 'jdoe', password: 'password1', role: 'Manager' },
  //     { id: 2, firstName: 'Jane', lastName: 'Doe', username: 'jane', password: 'password2', role: 'Developer' },
  //     { id: 3, firstName: 'Bob', lastName: 'Smith', username: 'bob', password: 'password3', role: 'Tester' },
  //     { id: 4, firstName: 'Alice', lastName: 'Johnson', username: 'alice', password: 'password4', role: 'Developer' },
  //     { id: 5, firstName: 'Charlie', lastName: 'Brown', username: 'charlie', password: 'password5', role: 'Manager' },
  //     { id: 6, firstName: 'Eve', lastName: 'Green', username: 'eve', password: 'password6', role: 'Tester' },
  //   ];
  
  //   return of(employees).pipe(
  //     tap(_ => console.log('fetched employees'))
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
