import httpStatus from 'http-status';
import { NextFunction, Response } from 'express';
import { AuthenticatedRequest } from '@/middlewares';
import roomsService from '@/services/rooms-service';

export async function getRoomById(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { roomId } = req.params;
  try {
    const room = await roomsService.getRoomById(Number(roomId));
    return res.status(httpStatus.OK).send(room);
  } catch (error) {
    next(error);
  }
}
