import { findInscriptionMock, getNowActivityByIdMock, getVeryFutureActivityByIdMock } from '../factories';
import activitiesRepository from '@/repositories/activities-repository';
import activityService from '@/services/activity-service';
import { cannotDeleteInscriptionError, notFoundError } from '@/errors';
import { forBiddenError } from '@/errors/forbidden-error';

describe('deleteInscription function', () => {
  it('should delete the inscription by an user', async () => {
    const inscription = findInscriptionMock();
    const userId = inscription.userId;
    const activity = getVeryFutureActivityByIdMock(inscription.activityId);

    jest.spyOn(activitiesRepository, 'findInscription').mockResolvedValue(inscription);
    jest.spyOn(activitiesRepository, 'getActivityById').mockResolvedValue(activity);
    jest.spyOn(activitiesRepository, 'deleteInscription').mockResolvedValue(null);

    await activityService.deleteInscription(userId, inscription.id);

    expect(activitiesRepository.deleteInscription).toHaveBeenCalledWith(inscription.id);
  });

  it('should not delete the inscription if is left 24hours to event start', async () => {
    const inscription = findInscriptionMock();
    const userId = inscription.userId;
    const activity = getNowActivityByIdMock(inscription.activityId);

    jest.spyOn(activitiesRepository, 'findInscription').mockResolvedValue(inscription);
    jest.spyOn(activitiesRepository, 'getActivityById').mockResolvedValue(activity);
    jest.spyOn(activitiesRepository, 'deleteInscription').mockResolvedValue(null);

    await expect(activityService.deleteInscription(userId, inscription.id)).rejects.toEqual(
      cannotDeleteInscriptionError(
        'You cannot cancel your registration in the last 24 hours before the start of the event.',
      ),
    );
  });

  it('should not delete the inscription if user is not the same of the inscription', async () => {
    const inscription = findInscriptionMock();
    const userId = 100000;
    jest.spyOn(activitiesRepository, 'findInscription').mockResolvedValue(inscription);

    await expect(activityService.deleteInscription(userId, inscription.id)).rejects.toEqual(forBiddenError());
  });

  it('should not delete if inscription does not exists.', async () => {
    jest.spyOn(activitiesRepository, 'findInscription').mockResolvedValue(null);

    await expect(activityService.deleteInscription(1, 5)).rejects.toEqual(notFoundError());
  });
});
