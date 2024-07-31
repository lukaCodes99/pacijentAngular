import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { NavigationComponent } from './navigation/navigation.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsTreatmentsComponent } from './patients-treatments/patients-treatments.component';
import { TreatmentDialogComponent } from './treatment-dialog/treatment-dialog.component';
import { TreatmentComponent } from './treatment/treatment.component';
import { PatientDialogComponent } from './patient-dialog/patient-dialog.component';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { LoginComponent } from './login/login.component';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { AuthInterceptor } from './utils/AuthInterceptor';
import { ForbiddenComponent } from './forbidden/forbidden.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EmployeeComponent,
    PatientComponent,
    TreatmentComponent,
    PatientsTreatmentsComponent,
    TreatmentDialogComponent,
    PatientDialogComponent,
    EmployeeDialogComponent,
    ConfirmDialogComponent,
    LoginComponent,
    LoginDialogComponent,
    ForbiddenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatTableModule,
    MatSelectModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
