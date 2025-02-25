import { Diagnosis } from "./diagnosis";


// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnosis['code']>;
}

interface HospitalEntry extends BaseEntry {
    type:'Hospital';
    discharge: {
        date: string;
        criteria: string;
    }
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: 'OccupationalHealthcare';
    sickLeave?: {
        startDate: string;
        endDate: string;
    };
    employerName: string;
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: number;
}

type EntryWithoutId = UnionOmit<Entry, 'id'>;

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

export interface Patients {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
    entries: Entry[];
}

export type NewPatientEntry = Omit<Patients, 'id'>;

export type NonSensitivePatientsEntry = Omit<Patients, 'ssn' | 'entries'>;