import { Diagnosis, HospitalEntry } from "../../types";

const Hospital = (props: { e: HospitalEntry, diagnoses: Diagnosis[] }) => {
    const { e, diagnoses } = props;
    return (<div key={e.id} style={{ border: '1px solid black', padding: '5px' }}>
        {e.date}-{e.description}
        {e.specialist}
        <p>Discharge:</p>
        {e.discharge.date}-{e.discharge.criteria}
        {e.diagnosisCodes?.map((d, j) => {
            const diagnosis = diagnoses.find(f => f.code === d);
            return (
                <li key={j}>{d} - {diagnosis && diagnosis.name}  </li>
            );
        })}
    </div>);
}

export default Hospital;