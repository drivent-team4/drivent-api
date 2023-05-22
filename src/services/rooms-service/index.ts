import roomRepository from '@/repositories/room-repository';
import { notFoundError } from '@/errors';

async function getRoomById(roomId: number) {
  const room = await roomRepository.findById(roomId);
  if (!room) throw notFoundError();
  return room;
}

const roomsService = {
  getRoomById,
};

export default roomsService;
