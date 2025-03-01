import diagnosisData from "./data/diagnoses";
import patientsEntry, { patientsData } from "./data/patients";
import { Diagnosis } from "./types/diagnosis";
import { Entry, EntryWithoutId, NewPatientEntry, NonSensitivePatientsEntry, Patients } from "./types/patientsType";
import { v1 as uuid } from 'uuid';

const getDiagnosis = (): Diagnosis[] => {
    return diagnosisData;
};

const getPatients = (): Patients[] => {
    return patientsEntry;
};

const getNonSensitiveEntries = (): NonSensitivePatientsEntry[] => {
    return patientsData.map(f => ({
        id: f.id,
        name: f.name,
        gender: f.gender,
        occupation: f.occupation,
        dateOfBirth: f.dateOfBirth,
    }));
};

const getPatient = (id: string): Patients | null => {
    const res = patientsData.find(f => f.id === id);
    if (!res) {
        return null;
    }
    return res;
}

const createPatient = (data: NewPatientEntry): Patients => {
    const newPatientEntry = {
        id: uuid(),
        ...data
    };
    patientsData.push(newPatientEntry);
    return newPatientEntry;
};

const addEntry = (id: string, data: EntryWithoutId[]): Entry[] | null => {
    const person = patientsData.find(f => f.id === id);
    if (!person) {
        return null;
    }
    const entryWithId = data.map(f => {
        return {
            id: uuid(),
            ...f
        }
    });

    person.entries.push(...entryWithId);
    return entryWithId;
}

export default {
    getDiagnosis,
    getPatients,
    getNonSensitiveEntries,
    createPatient,
    getPatient,
    addEntry
};