import { notFoundError } from '@/errors';
import { badRequestError } from '@/errors/bad-request-error';
import { cannotBookingError } from '@/errors/cannot-booking-error';
import bookingRepository from '@/repositories/booking-repository';
import enrollmentRepository from '@/repositories/enrollment-repository';
import roomRepository from '@/repositories/room-repository';
import hotelRepository from '@/repositories/hotel-repository';
import ticketsRepository from '@/repositories/tickets-repository';
import { createBookingArr } from '@/utils/createBookingArr';

async function checkEnrollmentTicket(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) throw cannotBookingError();

  const ticket = await ticketsRepository.findTicketByEnrollmentId(enrollment.id);

  if (!ticket || ticket.status === 'RESERVED' || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel) {
    throw cannotBookingError();
  }
}

async function checkValidBooking(roomId: number) {
  const room = await roomRepository.findById(roomId);
  const bookings = await bookingRepository.findByRoomId(roomId);

  if (!room) throw notFoundError();
  if (room.capacity <= bookings.length) throw cannotBookingError();
}

async function getBooking(userId: number) {
  const booking = await bookingRepository.findByUserId(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function getBookingWithHotel(userId: number) {
  const booking = await bookingRepository.findByUserIdWithHotel(userId);
  if (!booking) throw notFoundError();

  return booking;
}

async function listBookingByHotelId(userId: number, hotelId: number) {
  const { Rooms } = await hotelRepository.findRoomsByHotelId(hotelId);

  const roomBookingInfos = await createBookingArr(Rooms);

  return roomBookingInfos;
}

async function bookingRoomById(userId: number, roomId: number) {
  if (!roomId) throw badRequestError();

  await checkEnrollmentTicket(userId);
  await checkValidBooking(roomId);

  return bookingRepository.create({ roomId, userId });
}

async function changeBookingRoomById(userId: number, roomId: number) {
  if (!roomId) throw badRequestError();

  await checkValidBooking(roomId);
  const booking = await bookingRepository.findByUserId(userId);

  if (!booking || booking.userId !== userId) throw cannotBookingError();

  return bookingRepository.upsertBooking({
    id: booking.id,
    roomId,
    userId,
  });
}

async function countBookingsByRoomId(roomId: number) {
  const bookingCountByRoomId = await bookingRepository.countByRoomId(roomId);

  return bookingCountByRoomId;
}

async function listBookingsByRoomId(roomId: number) {
  const bookingsByRoomId = await bookingRepository.findByRoomId(roomId);

  return bookingsByRoomId;
}

const bookingService = {
  bookingRoomById,
  getBooking,
  getBookingWithHotel,
  changeBookingRoomById,
  checkEnrollmentTicket,
  checkValidBooking,
  listBookingByHotelId,
  countBookingsByRoomId,
  listBookingsByRoomId,
};

export default bookingService;
