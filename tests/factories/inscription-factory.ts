import faker from '@faker-js/faker';
import { Inscription } from '@prisma/client';
import { prisma } from '@/config';

export function findInscriptionMock() {
  const expect: Inscription = {
    id: 1,
    userId: 1,
    activityId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return expect;
}
