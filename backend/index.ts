import express from 'express';
import cors from 'cors';
import { Response } from 'express';
import { Diagnosis } from './types/diagnosis';
import services from './services';

import patientsRouter from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/patients', patientsRouter);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.get('/api/diagnoses', (_req, res: Response<Diagnosis[]>) => {
  console.log('calling diagnoses');

  res.send(services.getDiagnosis());
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});