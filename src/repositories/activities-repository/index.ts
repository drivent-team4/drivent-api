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

async function countInscriptions(activityId: number) {
  return await prisma.inscription.count({
    where: {
      activityId,
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

const activitiesRepository = {
  getActivities,
  getActivitiesByUserId,
  postInscription,
  getActivityById,
  countInscriptions,
  findInscription,
  deleteInscription,
};

export default activitiesRepository;
