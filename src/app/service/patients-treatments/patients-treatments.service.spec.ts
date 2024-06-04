import { TestBed } from '@angular/core/testing';

import { PatientsTreatmentsService } from './patients-treatments.service';

describe('PatientsTreatmentsService', () => {
  let service: PatientsTreatmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientsTreatmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
