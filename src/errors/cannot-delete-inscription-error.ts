import { ApplicationError } from '@/protocols';

export function cannotDeleteInscriptionError(message: string): ApplicationError {
  return {
    name: 'ForBiddenError',
    message,
  };
}
