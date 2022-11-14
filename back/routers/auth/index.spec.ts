import request from 'supertest';

import { server } from '../..';

const serve = async (login: string) => await request(server).post(`/api/auth/${login}`);

describe('auth router', () => {
  test('post login request with incorrect login', async () => {
    const response = await serve('incorrect');
    expect(response.statusCode).toBe(404);
  });

  test('post login request with correct login', async () => {
    const response = await serve('admin');
    expect(response.statusCode).toBe(200);
  });
});
