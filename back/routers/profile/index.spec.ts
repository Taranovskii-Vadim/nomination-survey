import request from 'supertest';

import { server, connection } from '../..';
import { get } from '../../utils';

let token;
const BASE = '/api/profile';

describe('profile router', () => {
  beforeAll(async () => {
    const auth = await request(server).post('/api/auth/admin');
    const cookie = auth.headers['set-cookie'][0];
    token = cookie.split('token=')[1];
  });

  test('get profile with token', async () => {
    const response = await get(token, BASE);

    expect(response.statusCode).toBe(200);
    expect(response.body.profile.role).toBe('admin');
  });

  test('get profile without token', async () => {
    const response = await request(server).get(BASE);

    expect(response.statusCode).toBe(401);
  });

  afterAll(() => {
    connection.close();
  });
});
