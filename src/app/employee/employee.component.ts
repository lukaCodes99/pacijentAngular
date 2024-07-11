import { Component } from '@angular/core';
import { Employee } from '../model/employee';
import { EmployeeService } from '../service/employee/employee.service';
import { BehaviorSubject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'username', 'role', 'actions'];
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

  getViewValueForRole(role: string): string {
    const foundRole = this.roles.find(r => r.value === role.toLowerCase());
    return foundRole ? foundRole.viewValue : 'Unknown Role';
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  deleteEmployee(employee: Employee): void {
    this.employeeService.deleteEmployee(employee)
      .subscribe(_ => {
        const prev = this.dataSource.getValue();
        const index = prev.findIndex(e => e.id === employee.id);
        prev.splice(index, 1);
        this.dataSource.next(prev);
      });
  }

  openEditingDialog(employee: Employee){
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '30%'
    });
    dialogRef.componentInstance.data = employee;

    dialogRef.afterClosed().subscribe((result) => {
      
      if(result !== null && result !== undefined) {
        this.employeeService.updateEmployee(result).subscribe((newEmployee) => {
          console.log(`updated employee w/ id=${newEmployee.id}`);
          const prev = this.dataSource.getValue();
          //prev.push(newEmployee);
          this.dataSource.next(prev);
        });
      }
      
    })
  }

  openDeleteConfirmDialog(employee: Employee): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: `Jeste li sigurni da želite izbrisati korisnika sa korisničim imenom ${employee.username}?`, confirmText: 'Izbriši', cancelText: 'Odustani' }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.employeeService.deleteEmployee(employee).subscribe(_ => {
          const prev = this.dataSource.getValue();
          const index = prev.findIndex(e => e.id === employee.id);
          if (index > -1) {
            prev.splice(index, 1);
            this.dataSource.next(prev);
          }
        });
      }
    });
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
