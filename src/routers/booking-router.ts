import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import { listBookingByHotelId, bookingRoom, changeBooking, listBooking, countBookingsByRoomId } from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/count', countBookingsByRoomId)
  .get('/:hotelId', listBookingByHotelId)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
