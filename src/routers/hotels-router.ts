import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { getHotelByRoomId, getHotels, getHotelsWithRooms } from '@/controllers/hotel-controller';

const hotelsRouter = Router();

hotelsRouter
  .all('/*', authenticateToken)
  .get('/', getHotels)
  .get('/room/:roomId', getHotelByRoomId)
  .get('/:hotelId', getHotelsWithRooms);

export { hotelsRouter };
