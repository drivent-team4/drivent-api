import { prisma } from '@/config';
import { redis } from '@/config/redis';

const cacheKey = 'event';

async function findFirst() {
  const cachedEvent = await redis.get(cacheKey);

  if (cachedEvent) {
    const event = JSON.parse(cachedEvent) as Event;
    return event;
  }
  const event = await prisma.event.findFirst();

  redis.set(cacheKey, JSON.stringify(event));

  return event;
}

const eventRepository = {
  findFirst,
};

export default eventRepository;
