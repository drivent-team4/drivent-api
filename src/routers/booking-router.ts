import { Router } from 'express';
import { authenticateToken } from '@/middlewares';
import {
  listBookingByHotelId,
  bookingRoom,
  changeBooking,
  listBooking,
  bookingsByRoomId,
  listBookingWithHotel,
} from '@/controllers';

const bookingRouter = Router();

bookingRouter
  .all('/*', authenticateToken)
  .get('', listBooking)
  .get('/hotel', listBookingWithHotel)
  .get('/count/:roomId', bookingsByRoomId)
  .get('/:hotelId', listBookingByHotelId)
  .post('', bookingRoom)
  .put('/:bookingId', changeBooking);

export { bookingRouter };
