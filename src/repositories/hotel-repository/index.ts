import { prisma } from '@/config';

async function findHotels() {
  return prisma.hotel.findMany();
}

async function findRoomsByHotelId(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
    include: {
      Rooms: {
        include: {
          Booking: true,
        },
      },
    },
  });
}

async function findHotelById(hotelId: number) {
  return prisma.hotel.findFirst({
    where: {
      id: hotelId,
    },
  });
}

const hotelRepository = {
  findHotels,
  findRoomsByHotelId,
  findHotelById,
};

export default hotelRepository;
