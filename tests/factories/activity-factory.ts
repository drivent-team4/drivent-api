import faker from '@faker-js/faker';
import { Activity } from '@prisma/client';
import { prisma } from '@/config';

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
