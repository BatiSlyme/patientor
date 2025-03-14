import axios from "axios";
import { Diagnosis, Entry, EntryWithoutId, Patient, PatientFormValues } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getDiagnoses = async () => {
  const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return res.data;
};

const createEntry = async (id: string, entry: EntryWithoutId) => {
  const res = await axios.post<Entry[]>(`${apiBaseUrl}/patients/${id}/entries`, entry);
  return res.data;
}

export default {
  getAll, create, getPatient, getDiagnoses, createEntry
};

