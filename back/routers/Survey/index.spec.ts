import request from 'supertest';

import { server } from '../..';

import { SurveyStatus } from './types';

let token;
const BASE = '/api/surveys';

// TODO maybe can create common utils for unit tests
const get = async (postfix?: string) => {
  return await request(server)
    .get(`${BASE}${postfix || ''}`)
    .set('Cookie', [`token=${token}`]);
};

const post = async (postfix?: string, payload?: any) => {
  return await request(server)
    .post(`${BASE}${postfix || ''}`)
    .send(payload)
    .set('Cookie', [`token=${token}`]);
};

const put = async (postfix?: string, payload?: any) => {
  return await request(server)
    .put(`${BASE}${postfix || ''}`)
    .send(payload)
    .set('Cookie', [`token=${token}`]);
};

describe('Survey router', () => {
  beforeAll(async () => {
    const auth = await request(server).post('/api/auth/admin');
    const cookie = auth.headers['set-cookie'][0];
    token = cookie.split('token=')[1];
  });

  test('get all surveys', async () => {
    const response = await get();

    expect(response.statusCode).toBe(200);
  });

  test('get survey by correct id', async () => {
    const response = await get('/1');

    expect(response.statusCode).toBe(200);
  });

  test('get survey by wrong id', async () => {
    const response = await get('/1000');

    expect(response.statusCode).toBe(404);
  });

  test('get survey by string id', async () => {
    const response = await get('/value');

    expect(response.statusCode).toBe(400);
  });

  test('get survey results', async () => {
    const response = await get('/results/user/0');

    expect(response.statusCode).toBe(200);
  });

  test('post survey results', async () => {
    const payload = { 1: 3, 2: 8, 3: 5, 4: 4, 5: 2, 6: 1 };
    const response = await post('/1', payload);

    expect(response.statusCode).toBe(200);
  });

  test('put survey status', async () => {
    const payload: SurveyStatus = 'chiefVote';

    const response = await put('/1', payload);

    expect(response.statusCode).toBe(200);
  });
});
