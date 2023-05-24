import { conflictError, notFoundError } from '@/errors';
import { forBiddenError } from '@/errors/forbidden-error';
import activitiesRepository from '@/repositories/activities-repository';

async function getAllActivity() {
  return await activitiesRepository.getActivities();
}

async function postInscription(userId: number, activityId: number) {
  const { capacity } = await activitiesRepository.getActivityById(activityId);
  const inscriptions = await activitiesRepository.countInscriptions(activityId);

  if (capacity <= inscriptions) throw conflictError('Esgotado!');

  return await activitiesRepository.postInscription(userId, activityId);
}

async function deleteInscription(userId: number, inscriptionId: number) {
  const inscription = await activitiesRepository.findInscription(inscriptionId);
  if (!inscription) throw notFoundError;

  if (!(inscription.userId === userId)) throw forBiddenError;

  return await activitiesRepository.deleteInscription(inscriptionId);
}

const activityService = {
  getAllActivity,
  postInscription,
  deleteInscription,
};
export default activityService;
