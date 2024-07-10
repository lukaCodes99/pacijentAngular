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
  displayedColumns: string[] = ['id', 'name', 'price', 'actions'];
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
      // Check if result is not null or undefined
      /*
      (assuming that clicking the confirm button returns a result, and canceling the dialog returns null or undefined)
      */
      if (result !== null && result !== undefined && result !== '') {
        this.treatmentService.addTreatment(result).subscribe((newTreatment) => {
          console.log(`added treatment w/ id=${newTreatment.id}`); // Fixed template string syntax
          const prev = this.dataSource.getValue();
          prev.push(newTreatment);
          this.dataSource.next(prev);
        });
      }
    });
  }
}
