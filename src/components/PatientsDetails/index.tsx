import React, { ReactNode, useState } from 'react';
import { TextField } from '@mui/material';
import { Diagnosis, Entry, Patient } from '../../types';
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import Entries from './Entries';
const DisabledTextFields = (props: { children: ReactNode[] }) => {
    const { children } = props;
    return (
        children.map((child, index) => {
            if (React.isValidElement(child)) {
                return (
                    child && <TextField key={index} {...child.props} disabled />
                );
            }
            return null;
        })
    );
};

const PatientorDetails = (props: { patient: Patient | undefined, diagnoses: Diagnosis[] }) => {
    const { patient, diagnoses } = props;
    // const [entries, setEntries] = useState<Entry[] | undefined>(patient ? patient.entries : []);
    if (!patient) return <div>...LOADING</div>;

    return (
        <>
            <h2>Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <DisabledTextFields >
                    <TextField id="outlined-uncontrolled" label="id" variant="outlined" value={patient.id ?? ''} />
                    <TextField id="outlined-uncontrolled" label="name" variant="filled" value={patient.name ?? ''} />
                    <TextField id="outlined-uncontrolled" label="occupation" variant="standard" value={patient.occupation ?? ''} />
                    <TextField id="outlined-uncontrolled" label="ssn" variant="filled" value={patient.ssn ?? ''} />
                    <TextField id="outlined-uncontrolled" label="dateOfBirth" variant="standard" value={patient.dateOfBirth ?? ''} />
                    {/* <TextField id="outlined-uncontrolled" label="entries" variant="outlined" value={patient.entries ?? ''} /> */}

                </DisabledTextFields>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <h2>Gender:</h2> {patient.gender === 'male' ? <MaleIcon fontSize='large' /> : <FemaleIcon fontSize='large' />}
                </div>
                <Entries setEntries={() => { }} entries={patient.entries} diagnoses={diagnoses} patientId={patient.id} />
            </div>
        </>
    )
}

export default PatientorDetails;