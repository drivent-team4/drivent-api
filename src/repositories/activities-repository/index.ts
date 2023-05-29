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

async function findInscription(id: number) {
  return await prisma.inscription.findUnique({
    where: {
      id,
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

const activitiesRepository = {
  getActivities,
  postInscription,
  getActivityById,
  countInscriptions,
  findInscription,
};

export default activitiesRepository;
