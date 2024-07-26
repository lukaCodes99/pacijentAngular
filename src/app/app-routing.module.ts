import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: 'pacijenti', component: PatientComponent },
  { path: 'administracija-korisnika', component: EmployeeComponent },
  { path: 'administracija-tretmana', component: TreatmentComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
