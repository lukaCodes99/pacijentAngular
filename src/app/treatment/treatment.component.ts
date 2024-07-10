import { Component } from '@angular/core';
import {
  MatDialog
} from '@angular/material/dialog';
import { BehaviorSubject } from 'rxjs';
import { Treatment } from '../model/treatment';
import { TreatmentService } from '../service/treatment/treatment.service';
import { TreatmentDialogComponent } from '../treatment-dialog/treatment-dialog.component';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css',
})
export class TreatmentComponent {
  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource: BehaviorSubject<Treatment[]> = new BehaviorSubject<Treatment[]>([]);

  constructor(private treatmentService: TreatmentService, public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('ngOnInit');
    this.treatmentService.getTreatments().subscribe((treatments) => {
      this.dataSource.next(treatments);
    });
  }

  getDataSource() {
    return this.dataSource.asObservable();
  }

  openDialog() {
    const dialogRef = this.dialog.open(TreatmentDialogComponent, {
      width: '30%'    
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      const prev = this.dataSource.getValue();
      result.id = prev.length + 1;
      prev.push(result);
      this.dataSource.next(prev);
    });
  }
}
