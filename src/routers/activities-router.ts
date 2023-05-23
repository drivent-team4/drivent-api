import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {} from '@/controllers';

const activitiesRouter = Router();

activitiesRouter.all('/*', authenticateToken).get('/');

export { activitiesRouter };
