import { Room } from '@prisma/client';
import bookingRepository from '@/repositories/booking-repository';

export async function createBookingArr(Rooms: Room[]) {
  const roomBookingInfos = await Promise.all(
    Rooms.map(async (room: Room) => {
      const bookings = await bookingRepository.findByRoomId(room.id);
      return { id: room.id, guests: bookings.length };
    }),
  );

  return roomBookingInfos;
}
