import request from 'supertest';

import { server } from '../..';

let token;
const BASE = '/api/surveys';

const get = async (postfix?: string) => {
  return await request(server)
    .get(`${BASE}${postfix}`)
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
});
