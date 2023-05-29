import faker from '@faker-js/faker';
import { Activity } from '@prisma/client';
import { prisma } from '@/config';
import dayjs from 'dayjs';

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


export function getVeryFutureActivityByIdMock(id?: number) {
  const expect: Activity = {
    id: id || 1,
    name: 'ActivityName',
    capacity: 10,
    auditoryId: 1,
    startAt: new Date('31/01/2500'),
    endAt: new Date('01/01/2500'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expect;
}

export function getNowActivityByIdMock(id?: number) {
  const expect: Activity = {
    id: id || 1,
    name: 'ActivityName',
    capacity: 10,
    auditoryId: 1,
    startAt: new Date(),
    endAt: new Date('01/01/2500'),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expect;
}
