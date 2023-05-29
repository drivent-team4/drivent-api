import { Address, Booking, Enrollment, Room, Ticket, TicketStatus, TicketType, Activity } from '@prisma/client';
import faker from '@faker-js/faker';
import dayjs from 'dayjs';
import { prisma } from '@/config';

type CreateActivityParams = {
  capacity: number;
  auditoryId: number;
  startAt: Date;
  endAt: Date;
  name: string;
};

export function createActivity() {
  return prisma.activity.create({
    data: {
      capacity: 20,
      auditoryId: 1,
      startAt: dayjs().add(2, 'day').toISOString(),
      endAt: dayjs().add(3, 'day').toISOString(),
      name: 'Hackathon',
    },
  });
}

export function createActivityFull() {
  return prisma.activity.create({
    data: {
      capacity: 1,
      auditoryId: 1,
      startAt: dayjs().add(2, 'day').toISOString(),
      endAt: dayjs().add(3, 'day').toISOString(),
      name: 'Hackathon',
    },
  });
}

export function createInscription(userId: number, activityId: number) {
  return prisma.inscription.create({
    data: {
      userId,
      activityId,
    },
  });
}
