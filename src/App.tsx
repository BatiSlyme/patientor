import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Diagnosis, Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientorDetails from "./components/PatientsDetails";


const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>();
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const match = useMatch("/:id");

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    const fetchDiagonoses = async () => {
      const res = await patientService.getDiagnoses();
      setDiagnoses(res);
    }

    void fetchPatientList();
    void fetchDiagonoses();
  }, []);

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await patientService.getPatient(match?.params.id ?? '');
      setPatient(res);
    };
    void fetchPatient();
  }, [match]);

  return (
    <div className="App">

      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients ?? []} />} />
          <Route path="/:id" element={
            <PatientorDetails patient={patient} diagnoses={diagnoses} />
          } />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
