const app = require('../src/app');
import request from 'supertest';

test('It should return all is well', async () => {
  const result = await request(app).get('/api');
  const msg: { message: string } = { message: 'all is well' };
  expect(result.body).toEqual(msg);
  expect(result.status).toBe(200);
});

/*      Post Endpoint Testing       */

test('Database should contain a contact after posting to it', async () => {
  const contact: {} = {
    firstname: 'testing1',
    lastname: 'nametesting',
    phone: '08066069526',
    isBlocked: false
  };
  const result = await request(app)
    .post('/api/contacts')
    .send(contact);
  expect(result.status).toBe(200);
  expect(result.body.id).toBeDefined();
});

test('Database should respond with bad request if post data is wrong', async () => {
  const contact: {} = {
    phone: '08066069526',
    isBlocked: false
  };
  const result = await request(app)
    .post('/api/contacts')
    .send(contact);
  expect(result.status).toBe(400);
  expect(result.body.id).toBeUndefined();
});

test('Database should respond with error 404 if post endpoint is wrong', async () => {
  const contact: {} = {
    phone: '08066069526',
    isBlocked: false
  };
  const result = await request(app)
    .post('/api/')
    .send(contact);
  expect(result.status).toBe(404);
  expect(result.body.id).toBeUndefined();
});

