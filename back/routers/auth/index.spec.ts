import request from 'supertest';

import { server } from '../..';

const BASE = '/api/auth';

describe('auth router', () => {
  test('post login request with incorrect login', async () => {
    const response = await request(server).post(`${BASE}/incorrect`);
    expect(response.statusCode).toBe(404);
  });

  test('post login request with correct login', async () => {
    const response = await request(server).post(`${BASE}/admin`);
    expect(response.statusCode).toBe(200);
  });
});
