import express, { Request, Response, NextFunction } from 'express';
import { NewPatientEntry, NonSensitivePatientsEntry, Patients } from '../types/patientsType';
import { NewEntrySchema } from '../utils';
import services from '../services';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatientsEntry[]>) => {
    res.send(services.getNonSensitiveEntries());
});

router.get('/:id', (_req, res: Response<Patients | string>) => {
    const { id } = _req.params;    
    const result = services.getPatient(id);

    if (!result) {
        res.status(404).send('Patient not found');
        return;
    }
    
    res.send(result);
});

const newPatientsParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        console.log(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientsParser, (req: Request<unknown, unknown, NewPatientEntry>, res: Response<Patients>) => {
    const addedEntry = services.createPatient(req.body);
    res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;