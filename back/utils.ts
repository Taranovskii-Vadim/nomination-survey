import request from 'supertest';

import { server } from '.';

// unit-tests utils

export const get = async (token: string, url: string) => {
  return request(server)
    .get(url)
    .set('Cookie', [`token=${token}`]);
};

export const post = async <T extends Record<number, number>>(token: string, url: string, payload: T) => {
  return request(server)
    .post(url)
    .send(payload)
    .set('Cookie', [`token=${token}`]);
};

export const put = async <T extends string>(token: string, url: string, payload: T) => {
  return request(server)
    .put(url)
    .send(payload)
    .set('Cookie', [`token=${token}`]);
};
