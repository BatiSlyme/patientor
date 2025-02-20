export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NewPatientEntry = Omit<Patients, 'id'>;

export type NonSensitivePatientsEntry = Omit<Patients, 'ssn'>;