import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { deleteInscription, getActivities, postInscription } from '@/controllers/activities-controller';

const activitiesRouter = Router();

activitiesRouter
  .all('/*', authenticateToken)
  .get('/', getActivities)
  .post('/', postInscription)
  .delete('/:activityId', deleteInscription);

export { activitiesRouter };
