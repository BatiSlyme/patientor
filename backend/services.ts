import diagnosisData from "./data/diagnoses";
import patientsData from "./data/patients";
import { Diagnosis } from "./types/diagnosis";
import { NewPatientEntry, NonSensitivePatientsEntry, Patients } from "./types/patientsType";
import { v1 as uuid } from 'uuid';

const getDiagnosis = (): Diagnosis[] => {
    return diagnosisData;
}

const getPatients = (): Patients[] => {
    return patientsData;
}

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(f => ({
        id: f.id,
        name: f.name,
        gender: f.gender,
        occupation: f.occupation,
        dateOfBirth: f.dateOfBirth
    }));
}

const createPatient = (data: NewPatientEntry): Patients => {
    const newPatientEntry = {
        id: uuid(),
        ...data
    }
    patientsData.push(newPatientEntry);
    return newPatientEntry;
}

export default {
    getDiagnosis,
    getPatients,
    getNonSensitiveEntries,
    createPatient
}