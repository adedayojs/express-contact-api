import app from '../src/app';
import request from 'supertest';

test('It should return all is well', async () => {
  const result = await request(app).get('/api');
  expect(result).toBe({ message: 'all is well' });
});
