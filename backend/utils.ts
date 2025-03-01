import { z } from "zod";
import { Gender } from "./types/enums";
import { NewPatientEntry, EntryWithoutId, EntryTypes, HealthCheckRating } from "./types/patientsType";


export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
    entries: z.array(z.any()).default([]) // Provide a default empty array
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    // console.log('NewEntrySchema.parse(object)', NewEntrySchema.parse(object));
    return NewEntrySchema.parse(object);
};

const BaseEntrySchema = z.object({
    description: z.string(),
    date: z.string(),
    specialist: z.string(),
    diagnosisCodes: z.array(z.string()).optional(),
});

const HealthCheckEntrySchema = BaseEntrySchema.extend({
    type: z.literal(EntryTypes.HealthCheck),
    healthCheckRating: z.nativeEnum(HealthCheckRating),
});

const HospitalEntrySchema = BaseEntrySchema.extend({
    type: z.literal(EntryTypes.Hospital),
    discharge: z.object({
        date: z.string(),
        criteria: z.string(),
    }),
});

const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
    type: z.literal(EntryTypes.OccupationalHealthcare),
    employerName: z.string(),
    sickLeave: z.object({
        startDate: z.string(),
        endDate: z.string(),
    }).optional(),
});

// ✅ Use a Discriminated Union on `type`
export const NewEntriesSchema = z.discriminatedUnion("type", [
    HealthCheckEntrySchema,
    HospitalEntrySchema,
    OccupationalHealthcareEntrySchema,
]);

export const toNewEntryEntry = (object: unknown): EntryWithoutId => {
    console.log('NewEntriesSchema.parse(object)', NewEntriesSchema.parse(object));
    return NewEntriesSchema.parse(object);
};