import { Diagnosis, OccupationalHealthcareEntry } from "../../types";

const OccupationalHealthcare = (props: { e: OccupationalHealthcareEntry, diagnoses: Diagnosis[] }) => {
    const { e, diagnoses } = props;
    return (<div key={e.id} style={{ border: '1px solid black', padding: '5px' }}>
        <p>{e.date}-{e.description}</p>
        <p>{e.specialist}</p>
        <p>employerName:{e.employerName}</p>
        {e.sickLeave && <p>sickLeave:{`from ${e.sickLeave?.startDate} to ${e.sickLeave?.endDate}`}</p>}
        {e.diagnosisCodes?.map((d, j) => {
            const diagnosis = diagnoses.find(f => f.code === d);
            return (
                <li key={j}>{d} - {diagnosis && diagnosis.name}</li>
            );
        })}
    </div>);
};

export default OccupationalHealthcare;