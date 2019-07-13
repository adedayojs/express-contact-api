import app from '../src/app';
import request from 'supertest';

test('It should return all is well', async () => {
  const result = await request(app).get('/api');
  const msg: { message: string } = { message: 'all is well' };
  expect(result.body).toEqual(msg);
  expect(result.status).toBe(200);
});
