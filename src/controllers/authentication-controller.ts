import { Request, Response } from 'express';
import httpStatus from 'http-status';
import authenticationService, { SignInParams } from '@/services/authentication-service';

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function oAuthSignIn(req: Request, res: Response) {
  const { code } = req.body as Record<string, string>;

  try {
    const result = await authenticationService.oAuthSignIn(code);

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    console.log(error);
    if (error.name === 'CannotEnrollBeforeStartDateError') return res.status(httpStatus.BAD_REQUEST).send(error);
    if (error.name === 'DuplicatedEmailError') return res.status(httpStatus.CONFLICT).send(error);
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}
