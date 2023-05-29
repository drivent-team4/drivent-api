import { cannotDeleteInscriptionError, conflictError, notFoundError } from '@/errors';
import { forBiddenError } from '@/errors/forbidden-error';
import activitiesRepository from '@/repositories/activities-repository';

async function getAllActivity() {
  return await activitiesRepository.getActivities();
}

async function checkScheduleConflict(userId: number, activityId: number) {
  const userActivities = await activitiesRepository.getActivitiesByUserId(userId);
  const newActivity = await activitiesRepository.getActivityById(activityId);
  const newActivityStartTime = new Date(newActivity.startAt);
  const newActivityEndTime = new Date(newActivity.endAt);
  const checkConflict = userActivities.some((inscription) => {
    const activityStartTime = new Date(inscription.Activity.startAt);
    const activityEndTime = new Date(inscription.Activity.endAt);
    return (
      (newActivityStartTime >= activityStartTime && newActivityStartTime < activityEndTime) ||
      (newActivityEndTime > activityStartTime && newActivityEndTime <= activityEndTime)
    );
  });
  if (checkConflict) {
    return true;
  } else {
    return false;
  }
}

async function postInscription(userId: number, activityId: number) {
  const activity = await activitiesRepository.getActivityById(activityId);
  if (!activity) throw notFoundError();

  const { capacity } = activity;
  const inscriptions = await activitiesRepository.countInscriptions(activityId);
  const checkConflict = await checkScheduleConflict(userId, activityId);
  if (capacity <= inscriptions) throw conflictError('Esgotado!');
  if (checkConflict) throw conflictError('Há conflito de horários.');
  return await activitiesRepository.postInscription(userId, activityId);
}

const activityService = {
  getAllActivity,
  postInscription,
};
export default activityService;
