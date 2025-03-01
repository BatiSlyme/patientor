import React, { useState } from "react";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../../types";
import HealthCheck from "../EntryOptions/HealthCheck";
import Hospital from "../EntryOptions/Hospital";
import OccupationalHealthcare from "../EntryOptions/OccupationalHealthcare";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import patients from "../../services/patients";

const Entries: React.FC<{
    entries: Entry[],
    diagnoses: Diagnosis[],
    patientId: string,
    setEntries: React.Dispatch<React.SetStateAction<Entry[] | undefined>>
}>
    = ({ entries, diagnoses, patientId, setEntries }) => {
        const [showModalEntryAdd, setShowModalEntryAdd] = useState<boolean>(false);
        const [entry, setEntry] = useState<EntryWithoutId>({
            type: 'Hospital',
            description: '',
            date: '',
            specialist: '',
            diagnosisCodes: [],
            discharge: {
                date: '',
                criteria: ''
            }
        });

        const [healthCheckRating, setHealthCheckRating] = useState<"Healthy" |
            "LowRisk" |
            "HighRisk" |
            "CriticalRisk">('Healthy');

        const validateValues = (entry: EntryWithoutId) => {
            const entryObj = Object.keys(entry);
            console.log(entryObj);

            for (const element of entryObj) {
                if (typeof entry[element as keyof EntryWithoutId] === 'object') {
                    if (entry.hasOwnProperty(element)) {
                        validateValues(entry[element] as object);
                    }
                }
                if (Array.isArray(entry[element as keyof EntryWithoutId])) {
                    if (entry[element as string].length < 1) {
                        alert(`please fill ${element}`);
                        return;
                    }
                }
                if (!entry[element as keyof EntryWithoutId]) {
                    alert(`please fill ${element}`);
                    return;
                }
            }
        }

        const handleSubmit = async () => {
            validateValues(entry);
            const res = await patients.createEntry(patientId, entry);
            setEntries(res);
            setShowModalEntryAdd(false);
        }

        return (
            <>
                <p><h3>Entries:</h3></p>
                {entries && entries?.length > 0 && entries?.map((e) => {
                    switch (e.type) {
                        case 'Hospital': {
                            return <Hospital e={e} diagnoses={diagnoses} key={e.id} />
                        }
                        case 'OccupationalHealthcare': {
                            return <OccupationalHealthcare e={e} diagnoses={diagnoses} key={e.id} />;
                        }
                        case 'HealthCheck': {
                            return <HealthCheck e={e} diagnoses={diagnoses} key={e.id} />
                        }
                    }
                })}
                <Button variant="contained" onClick={() => { setShowModalEntryAdd(true) }}>Add new entry</Button>

                <Dialog open={showModalEntryAdd} fullWidth maxWidth={'lg'} scroll='body' >
                    <DialogTitle>Add new Entries</DialogTitle>
                    <DialogContent dividers={false} >
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">Type</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={entry.type}
                                label="Type"
                                onChange={e => setEntry({ ...entry, type: e.target.value as 'Hospital' | 'OccupationalHealthcare' | 'HealthCheck' })}
                            >
                                <MenuItem value={'Hospital'}>Hospital</MenuItem>
                                <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                                <MenuItem value={'OccupationalHealthcare'}>OccupationalHealthcare</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="description"
                            name="description"
                            label="Description"
                            type="text"
                            onChange={(e) => setEntry({ ...entry, description: e.target.value })}
                            fullWidth
                            variant="standard"
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="specialist"
                            name="specialist"
                            label="Specialist"
                            type="text"
                            onChange={(e) => setEntry({ ...entry, specialist: e.target.value })}
                            fullWidth
                            variant="standard"
                        />
                        <FormControl fullWidth margin="normal">
                            <InputLabel shrink>Date</InputLabel>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="date"
                                name="date"
                                type="date"
                                onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                                fullWidth
                                variant="standard"
                            /></FormControl>
                        {entry.type === 'OccupationalHealthcare' && <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="speacialist"
                            name="speacialist"
                            label="Specialist"
                            type="text"
                            onChange={(e) => setEntry({ ...entry, specialist: e.target.value })}
                            fullWidth
                            variant="standard"
                        />}
                        {entry.type === 'HealthCheck' && <FormControl fullWidth margin="normal">
                            <InputLabel id="demo-simple-select-label">HealthCheck Rating</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={healthCheckRating}
                                label="HealthCheck Rating"
                                onChange={(е) => {
                                    setHealthCheckRating(е.target.value as "Healthy" | "LowRisk" | "HighRisk" | "CriticalRisk"),
                                        setEntry({ ...entry, healthCheckRating: HealthCheckRating[е.target.value as keyof typeof HealthCheckRating] })
                                }}
                            >
                                {HealthCheckRating && Object.keys(HealthCheckRating).filter(f => isNaN(Number(f))).map((e) =>
                                    <MenuItem key={e} value={`${e}`}>{e}</MenuItem>
                                )}
                            </Select>
                        </FormControl>}
                        {entry.type === 'Hospital' && <fieldset style={{ border: '2px solid black', padding: '10px' }}>
                            <legend>Discharge</legend>
                            <FormControl fullWidth margin="normal" color="primary" >
                                <InputLabel shrink>Discharge date</InputLabel>
                                <TextField
                                    autoFocus
                                    required
                                    margin="dense"
                                    id="dischargeDate"
                                    name="dischargeDate"
                                    type="date"
                                    onChange={(e) => setEntry({ ...entry, discharge: { ...entry.discharge, date: e.target.value } })}
                                    fullWidth
                                    variant="standard"
                                /> </FormControl>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="dischargeCriteria"
                                name="dischargeCriteria"
                                label="Discharge criteria"
                                type="text"
                                onChange={(e) => setEntry({ ...entry, discharge: { ...entry.discharge, criteria: e.target.value } })}
                                fullWidth
                                variant="standard"
                            />
                        </fieldset>
                        }
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="diagnosisCodes"
                            name="diagnosisCodes"
                            label="Diagnosis codes"
                            type="text"
                            onChange={(e) => setEntry({ ...entry, diagnosisCodes: e.target.value.split(', ') })}
                            fullWidth
                            variant="standard"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => { setShowModalEntryAdd(false) }}>Cancel</Button>
                        <Button type="submit" onClick={handleSubmit}> Add</Button>
                    </DialogActions>
                </Dialog >
            </>

        )
    }

export default Entries;