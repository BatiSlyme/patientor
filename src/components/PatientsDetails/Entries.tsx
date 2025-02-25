import { Diagnosis, Entry } from "../../types";

const Entries = (props: { entries: Entry[], diagnoses: Diagnosis[] }) => {
    const { entries, diagnoses } = props;
    for (const entry of entries) {
        switch (entry.type) {
            case 'Hospital': {
                return (<>
                    <p>Discharge:</p>
                    {entry.discharge.date}-{entry.discharge.criteria}
                </>);
            }
            case 'OccupationalHealthcare': {
                return (<>
                
                </>);
            }
            case 'HealthCheck': {
                return (<></>);
            }
        }

    }

    return (
        <>


            <p><h3>Entries:</h3></p>

            {entries && entries?.length > 0 && entries?.map((e, i) => {

                return (
                    <div key={e.id}>
                        <p>{e.date}-{e.description}</p>
                        <h3>diagnosisCodes:</h3>

                        <ul>
                            {e.diagnosisCodes?.map((d, j) => {
                                const diagnosis = diagnoses.find(f => f.code === d);
                                console.log('diagnosis', diagnosis);

                                return (

                                    <li key={j}>{d} - {diagnosis && diagnosis.name}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                );
            })}
        </>
    )
}

export default Entries;