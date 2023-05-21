import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getRoomById } from '@/controllers/rooms-controller';

const roomsRouter = Router();

roomsRouter.all('/*', authenticateToken).get('/:roomId', getRoomById);

export { roomsRouter };
