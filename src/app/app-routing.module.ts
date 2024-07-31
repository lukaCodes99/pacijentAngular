import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { PatientComponent } from './patient/patient.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './utils/AuthGuard';
import { HeadNurseAuthGuard } from './utils/HeadNurseAuthGuard';
import { AdminAuthGuard } from './utils/AdminAuthGuard';
import { NurseAuthGuard } from './utils/NurseAuthGuard';
import { ForbiddenComponent } from './forbidden/forbidden.component';


const routes: Routes = [
  { path: 'pacijenti', component: PatientComponent, canActivate: [AuthGuard, NurseAuthGuard] },
  { path: 'administracija-korisnika', component: EmployeeComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'administracija-tretmana', component: TreatmentComponent, canActivate: [AuthGuard, HeadNurseAuthGuard] },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
