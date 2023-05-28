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
  const { capacity } = await activitiesRepository.getActivityById(activityId);
  const inscriptions = await activitiesRepository.countInscriptions(activityId);
  const checkConflict = await checkScheduleConflict(userId, activityId);
  if (capacity <= inscriptions) throw conflictError('Esgotado!');
  if (checkConflict) throw conflictError('Há conflito de horários.');
  return await activitiesRepository.postInscription(userId, activityId);
}

async function deleteInscription(userId: number, inscriptionId: number) {
  const inscription = await activitiesRepository.findInscription(inscriptionId);
  if (!inscription) throw notFoundError();

  if (!(inscription.userId === userId)) throw forBiddenError();

  const activity = await activitiesRepository.getActivityById(inscription.activityId);
  const dateNow = new Date();
  const dateActivity = new Date(`${activity.startAt}`);

  const DateDiffInHours = (dateActivity.getTime() - dateNow.getTime()) / (1000 * 60 * 60);
  if (DateDiffInHours < 24)
    throw cannotDeleteInscriptionError(
      'You cannot cancel your registration in the last 24 hours before the start of the event.',
    );

  return await activitiesRepository.deleteInscription(inscriptionId);
}

const activityService = {
  getAllActivity,
  postInscription,
  deleteInscription,
};
export default activityService;
