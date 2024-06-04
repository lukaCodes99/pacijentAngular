import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee/employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'role'];
  dataSource: Employee[] = [];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.employeeService.getEmployees().subscribe(employees => {
      this.dataSource = employees;
    });
  }
}
