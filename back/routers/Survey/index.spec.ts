import request from 'supertest';

import { server } from '../..';

describe('Survey router', () => {
  test('get all surveys', async () => {
    // TODO got no idea how to pass jwt token
    const response = await request(server).get('/api/surveys');

    expect(response.statusCode).toBe(401);
  });
});
