import { User } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import passwordGenerator from 'generate-password';
import eventsService from '../events-service';
import { duplicatedEmailError } from '../users-service';
import { invalidCredentialsError } from './errors';
import { exclude } from '@/utils/prisma-utils';
import userRepository from '@/repositories/user-repository';
import sessionRepository from '@/repositories/session-repository';
import { cannotEnrollBeforeStartDateError } from '@/errors';

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);

  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function oAuthSignIn(code: string): Promise<SignInResult> {
  const accessToken = await exchangeCodeForAccessToken(code);
  const userData = await getDataGithubUser(accessToken);

  const userByGithubLogin = await userRepository.findByGithubEmail(userData.email, {
    id: true,
    email: true,
    password: true,
  });
  if (userByGithubLogin) {
    const token = await createSession(userByGithubLogin.id);

    return {
      user: exclude(userByGithubLogin, 'password'),
      token,
    };
  }

  await createUserWithGithubData(userData.email);

  const user = await getUserOrFail(userData.email);

  const token = await createSession(user.id);

  await sessionRepository.create({
    token,
    userId: user.id,
  });

  return {
    user: exclude(user, 'password'),
    token,
  };
}

async function createUserWithGithubData(email: string) {
  await canEnrollOrFail();

  await validateUniqueEmailOrFail(email);

  const randomPassword = passwordGenerator.generate();
  const hashedPassword = await bcrypt.hash(randomPassword, 12);
  await userRepository.create({ email, password: hashedPassword, githubEmail: email });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

async function canEnrollOrFail() {
  const canEnroll = await eventsService.isCurrentEventActive();
  if (!canEnroll) {
    throw cannotEnrollBeforeStartDateError();
  }
}

async function exchangeCodeForAccessToken(code: string) {
  const { REDIRECT_URI, CLIENT_ID, CLIENT_SECRET, GITHUB_ACCESS_TOKEN_URL } = process.env;

  const params = {
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    client_secret: CLIENT_SECRET,
    code,
    grant_type: 'authorization_code',
  };

  const { data } = await axios.post(GITHUB_ACCESS_TOKEN_URL, params, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  return data.access_token;
}

async function getDataGithubUser(token: string | string[]) {
  const response = await axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, 'email' | 'password'>;

type SignInResult = {
  user: Pick<User, 'id' | 'email'>;
  token: string;
};

type GetUserOrFailResult = Pick<User, 'id' | 'email' | 'password'>;

const authenticationService = {
  signIn,
  oAuthSignIn,
};

export default authenticationService;
export * from './errors';
