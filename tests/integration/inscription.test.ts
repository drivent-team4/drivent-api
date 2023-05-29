import faker from '@faker-js/faker';
import httpStatus from 'http-status';
import * as jwt from 'jsonwebtoken';
import supertest from 'supertest';
import { createUser } from '../factories';
import { cleanDb, generateValidToken } from '../helpers';
import { createActivity, createActivityFull, createInscription } from '../factories/activity-factory';
import app, { init } from '@/app';
import { prisma } from '@/config';

beforeAll(async () => {
  await init();
  await cleanDb();
});

beforeEach(async () => {
  await cleanDb();
});

const server = supertest(app);

describe('GET /activity', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activity');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe('when token is valid', () => {
    it('should respond with status 200 with activity list ', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const activity = await createActivity();
      const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

      expect(response.status).toEqual(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: activity.id,
          auditoryId: activity.auditoryId,
          Inscription: [],
          name: activity.name,
          startAt: activity.startAt.toISOString(),
          endAt: activity.endAt.toISOString(),
          capacity: activity.capacity,
          createdAt: activity.createdAt.toISOString(),
          updatedAt: activity.updatedAt.toISOString(),
        },
      ]);
    });
  });
});

describe('POST /activity', () => {
  it('should respond with status 401 if no token is given', async () => {
    const response = await server.get('/activity');

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if given token is not valid', async () => {
    const token = faker.lorem.word();

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it('should respond with status 401 if there is no session for given token', async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);

    const response = await server.get('/activity').set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  function createValidBody() {
    return {
      activityId: 1,
    };
  }
  function createInvalidBody() {
    return {
      activityId: 2,
    };
  }

  describe('when token is valid', () => {
    it('should respond with status 404 with a invalid body', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const activity = await createActivity();
      const invalidBody = createInvalidBody();
      const response = await server.post('/activity').set('Authorization', `Bearer ${token}`).send(invalidBody);

      expect(response.status).toEqual(httpStatus.NOT_FOUND);
    });
    it('should respond with status 400 with a invalid body', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const activity = await createActivity();
      const response = await server.post('/activity').set('Authorization', `Bearer ${token}`).send();

      expect(response.status).toEqual(httpStatus.BAD_REQUEST);
    });
    it('should respond with status CONFLICT with a valid body and no capacity', async () => {
      const otherUser = await createUser();
      const user = await createUser();
      const token = await generateValidToken(user);
      const activity = await createActivityFull();
      const inscription = await createInscription(otherUser.id, activity.id);

      const validBody = {
        activityId: activity.id,
      };

      const response = await server.post('/activity').set('Authorization', `Bearer ${token}`).send(validBody);

      expect(response.status).toEqual(httpStatus.CONFLICT);
    });
    it('should respond with status 201 with a valid body', async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const activity = await createActivity();
      const validBody = {
        activityId: activity.id,
      };

      const response = await server.post('/activity').set('Authorization', `Bearer ${token}`).send(validBody);

      expect(response.status).toEqual(httpStatus.CREATED);
      const inscription = await prisma.inscription.findFirst({ where: { userId: user.id } });
      expect(inscription).toBeDefined();
    });
  });
});
