import React, { SyntheticEvent, useEffect, useState } from "react";
import { Diagnosis, Entry, EntryWithoutId, HealthCheckRating } from "../../types";
import HealthCheck from "../EntryOptions/HealthCheck";
import Hospital from "../EntryOptions/Hospital";
import OccupationalHealthcare from "../EntryOptions/OccupationalHealthcare";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";

const Entries: React.FC<{ entries: Entry[], diagnoses: Diagnosis[] }> = ({ entries, diagnoses }) => {
    const [showModalEntryAdd, setShowModalEntryAdd] = useState<boolean>(false);
    const [type, setType] = useState<string>('');
    const [entry, setEntry] = useState<EntryWithoutId>({
        type: 'Hospital',
        healthCheckRating: 0,
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: [],
    });
    useEffect(() => {
        console.log('entry', entry);
    }, [entry]);

    const [healthCheckRating, setHealthCheckRating] = useState<"Healthy" |
        "LowRisk" |
        "HighRisk" |
        "CriticalRisk">('Healthy');
    return (
        <>
            <p><h3>Entries:</h3></p>
            {entries && entries?.length > 0 && entries?.map((e, i) => {
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

            <Dialog open={showModalEntryAdd} fullWidth maxWidth={'lg'} >
                <DialogTitle>Add new Entries</DialogTitle>
                <DialogContent style={{ minHeight: '100vh' }}>
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={entry.type}
                            label="Type"
                            onChange={е => setEntry({ ...entry, type: е.target.value as string })}
                        >
                            <MenuItem value={'HealthCheck'}>HealthCheck</MenuItem>
                            <MenuItem value={'Hospital'}>Hospital</MenuItem>
                            <MenuItem value={'OccupationalHealthcar'}>OccupationalHealthcar</MenuItem>
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
                        id="date"
                        name="date"
                        placeholder=""
                        label="Date"
                        type="date"
                        onChange={(e) => setEntry({ ...entry, date: e.target.value })}
                        fullWidth
                        variant="standard"
                    />
                    {entry.type === 'OccupationalHealthcare' && <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="speacialist"
                        name="speacialist"
                        label="Specialist"
                        type="text"
                        onChange={(e) => setEntry({ ...entry, speacialist: e.target.value })}
                        fullWidth
                        variant="standard"
                    />}
                    <FormControl fullWidth margin="normal">
                        <InputLabel id="demo-simple-select-label">HealthCheck Rating</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={healthCheckRating}
                            label="HealthCheck Rating"
                            onChange={е => setHealthCheckRating(е.target.value as "Healthy" | "LowRisk" | "HighRisk" | "CriticalRisk")}
                        >
                            {HealthCheckRating && Object.keys(HealthCheckRating).filter(f => isNaN(Number(f))).map((e) =>
                                <MenuItem key={e} value={`${e}`}>{e}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="diagnosisCodes"
                        name="diagnosisCodes"
                        label="Diagnosis codes"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => { setShowModalEntryAdd(false) }}>Cancel</Button>
                    <Button type="submit">Add</Button>
                </DialogActions>
            </Dialog >

        </>

    )
}

export default Entries;