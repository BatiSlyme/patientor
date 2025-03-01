import { Diagnosis, HealthCheckEntry } from "../../types";

const HealthCheck = (props: { e: HealthCheckEntry, diagnoses: Diagnosis[] }) => {
    const { e, diagnoses } = props;
    return (<div key={e.id} style={{ border: '1px solid black', padding: '5px' }}>
        <p>{e.date}-{e.description}</p>
        <p>{e.specialist}</p>
        {e.diagnosisCodes?.map((d, j) => {
            const diagnosis = diagnoses.find(f => f.code === d);
            return (
                <li key={j}>{d} - {diagnosis && diagnosis.name}</li>
            );
        })}
        <p>healthCheckRating:{e.healthCheckRating}</p>
    </div>);
}

export default HealthCheck;