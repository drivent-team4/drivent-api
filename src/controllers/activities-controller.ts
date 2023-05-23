import { NextFunction, Response } from 'express';
import httpStatus from 'http-status';

import { AuthenticatedRequest } from '@/middlewares';

export async function getActivities(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  try {
  } catch (error) {
    next(error);
  }
}
