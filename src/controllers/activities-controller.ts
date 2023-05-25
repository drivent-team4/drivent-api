import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';
import activityService from '@/services/activity-service';
import { badRequestError } from '@/errors/bad-request-error';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
    const result = await activityService.getAllActivity();
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}

export async function postInscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const activityId = Number(req.body.activityId);

  if (!activityId) return next(badRequestError);
  try {
    const result = await activityService.postInscription(userId, activityId);
    return res.status(httpStatus.CREATED).send(result);
  } catch (error) {
    next(error);
  }
}

export async function deleteInscription(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { userId } = req;
  const inscriptionId = Number(req.body.inscriptionId);

  if (!inscriptionId) return next(badRequestError);
  try {
    const result = await activityService.deleteInscription(userId, inscriptionId);
    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    next(error);
  }
}
