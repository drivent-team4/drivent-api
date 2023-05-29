import { prisma } from '@/config';

async function getActivities() {
  return await prisma.activity.findMany({
    include: {
      Inscription: true,
    },
  });
}

async function getActivityById(id: number) {
  return await prisma.activity.findUnique({
    where: {
      id,
    },
  });
}

async function getActivitiesByUserId(userId: number) {
  return await prisma.inscription.findMany({
    where: {
      userId,
    },
    include: {
      Activity: true,
    },
  });
}

async function findInscription(userId: number, activityId: number) {
  return await prisma.inscription.findFirst({
    where: {
      userId,
      activityId,
    },
  });
}

async function postInscription(userId: number, activityId: number) {
  return await prisma.inscription.create({
    data: {
      activityId,
      userId,
    },
  });
}

async function deleteInscription(inscriptionId: number) {
  return await prisma.inscription.delete({
    where: {
      id: inscriptionId,
    },
  });
}

async function countInscriptions(activityId: number) {
  return await prisma.inscription.count({
    where: {
      activityId,
    },
  });
}

const activitiesRepository = {
  getActivities,
  getActivitiesByUserId,
  postInscription,
  deleteInscription,
  getActivityById,
  countInscriptions,
  findInscription,
};

export default activitiesRepository;
