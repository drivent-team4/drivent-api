import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getActivities, postInscription } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/', getActivities).post('/', postInscription);

export { activitiesRouter };
