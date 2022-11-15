import request from 'supertest';

import { server } from '../..';

let token;

const get = async () => {
  return await request(server)
    .get('/api/profile')
    .set('Cookie', [`token=${token}`]);
};

describe('profile router', () => {
  beforeAll(async () => {
    const auth = await request(server).post('/api/auth/admin');
    const cookie = auth.headers['set-cookie'][0];
    token = cookie.split('token=')[1];
  });

  test('get profile with token', async () => {
    const response = await get();

    expect(response.statusCode).toBe(200);
  });

  test('get profile without token', async () => {
    const response = await request(server).get('/api/profile');

    expect(response.statusCode).toBe(401);
  });
});
