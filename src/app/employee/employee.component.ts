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

  roles = [
    {value: 'admin', viewValue: 'Administrator'},
    {value: 'head_nurse', viewValue: 'Glavna medicinska sestra'},
    {value: 'nurse', viewValue: 'Medicinska sestra'},
    {value: 'doctor', viewValue: 'Doktor'},
  ];

  constructor(private employeeService: EmployeeService, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource.next(employees);
    });
  }

  // In your component.ts file



  getViewValueForRole(role: string): string {
    const foundRole = this.roles.find(r => r.value === role.toLowerCase());
    return foundRole ? foundRole.viewValue : 'Unknown Role';
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '30%'
    });

    dialogRef.afterClosed().subscribe((result) => {
      
      if(result !== null && result !== undefined) {
        this.employeeService.addEmployee(result).subscribe((newEmployee) => {
          console.log(`added employee w/ id=${newEmployee.id}`);
          const prev = this.dataSource.getValue();
          prev.push(newEmployee);
          this.dataSource.next(prev);
        });
      }
      
    })
  }

}
