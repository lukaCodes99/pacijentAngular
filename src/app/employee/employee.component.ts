import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee/employee.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'role'];
  dataSource: BehaviorSubject<Employee[]> = new BehaviorSubject<Employee[]>([]);

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource.next(employees);
    });
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
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
