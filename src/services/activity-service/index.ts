import { cannotDeleteInscriptionError, conflictError, notFoundError } from '@/errors';
import { forBiddenError } from '@/errors/forbidden-error';
import activitiesRepository from '@/repositories/activities-repository';

async function getAllActivity() {
  return await activitiesRepository.getActivities();
}

async function postInscription(userId: number, activityId: number) {
  const activity = await activitiesRepository.getActivityById(activityId);
  if (!activity) throw notFoundError();

  const { capacity } = activity;
  const inscriptions = await activitiesRepository.countInscriptions(activityId);

  if (capacity <= inscriptions) throw conflictError('Esgotado!');

  return await activitiesRepository.postInscription(userId, activityId);
}

const activityService = {
  getAllActivity,
  postInscription,
};
export default activityService;
