import express from 'express';
import cors from 'cors';
import { Response } from 'express'
import { Diagnosis } from './types/diagnosis';
import services from './services';
import { NonSensitivePatientsEntry } from './types/patientsType';
import { toNewPatientEntry } from './utils';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res: Response<Diagnosis[]>) => {
  res.send(services.getDiagnosis());
});

app.get('/api/patients', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
  res.send(services.getNonSensitiveEntries());
});

app.post('/api/patients', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = services.createPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (error) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});