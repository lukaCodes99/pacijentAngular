import { Employee } from "./employee";
import { Patient } from "./patient";
import { Treatment } from "./treatment";

export interface PatientTreatments{
    id?: number;
    patientId?: Patient;
    treatmentId?: Treatment;
    inserterId?: Employee;
    insertedAt?: string;
}
