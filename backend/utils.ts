import { z } from "zod";
import { Gender } from "./types/enums";
import { NewPatientEntry } from "./types/patientsType";

export const NewEntrySchema = z.object({
    name: z.string(),
    dateOfBirth: z.string().date(),
    ssn: z.string(),
    gender: z.nativeEnum(Gender),
    occupation: z.string(),
});

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
    console.log('NewEntrySchema.parse(object)', NewEntrySchema.parse(object));

    return NewEntrySchema.parse(object);
};