import { Component } from '@angular/core';
import { Treatment } from '../model/treatment';
import { TreatmentService } from '../service/treatment/treatment.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrl: './treatment.component.css'
})
export class TreatmentComponent {
  displayedColumns: string[] = ['id', 'name', 'price'];
  dataSource: Treatment[] = [];

  constructor(private treatmentService: TreatmentService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.treatmentService.getTreatments().subscribe(treatments => {
      this.dataSource = treatments;
    });
  }
}
