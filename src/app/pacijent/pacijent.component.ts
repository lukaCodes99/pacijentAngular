import { Component, OnInit } from '@angular/core';
import { PacijentService, Pacijent } from '../service/pacijent/pacijent.service';

@Component({
  selector: 'app-pacijent',
  templateUrl: './pacijent.component.html',
  styleUrls: ['./pacijent.component.css']
})
export class PacijentComponent implements OnInit {
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'phoneNumber'];
  dataSource: Pacijent[] = [];

  constructor(private pacijentService: PacijentService) { }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.pacijentService.getPacijenti().subscribe(pacijenti => {
      this.dataSource = pacijenti;
    });
  }

}