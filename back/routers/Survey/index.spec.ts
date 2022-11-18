import request from 'supertest';

import { server, connection } from '../..';
import { get, post, put } from '../../utils';

import { SurveyStatus } from './types';

let token;
const BASE = '/api/surveys';

describe('Survey router', () => {
  beforeAll(async () => {
    const auth = await request(server).post('/api/auth/admin');
    const cookie = auth.headers['set-cookie'][0];
    token = cookie.split('token=')[1];
  });

  test('get all surveys', async () => {
    const response = await get(token, BASE);

    expect(response.statusCode).toBe(200);
    expect(response.body.surveys.length).toBe(6);
  });

  test('get survey by correct id', async () => {
    const id = 1;
    const response = await get(token, `${BASE}/${id}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.survey.id).toBe(id);
  });

  test('get survey by wrong id', async () => {
    const response = await get(token, `${BASE}/1000`);

    expect(response.statusCode).toBe(404);
  });

  test('get survey by string id', async () => {
    const response = await get(token, `${BASE}/value`);

    expect(response.statusCode).toBe(400);
  });

  test('get survey results', async () => {
    const response = await get(token, `${BASE}/results/user/0`);

    expect(response.statusCode).toBe(200);
  });

  test('post survey results', async () => {
    const payload: Record<number, number> = { 1: 3, 2: 8, 3: 5, 4: 4, 5: 2, 6: 1 };
    const response = await post(token, `${BASE}/1`, payload);

    expect(response.statusCode).toBe(200);
  });

  test('put survey status', async () => {
    const response = await put<SurveyStatus>(token, `${BASE}/1`, 'chiefVote');

    // TODO got to send new status to front

    expect(response.statusCode).toBe(200);
  });

  afterAll(() => {
    connection.close();
  });
});
