const app = require('../src/app');
import request from 'supertest';

test('It should return all is well', async () => {
  const result = await request(app).get('/api');
  const msg: { message: string } = { message: 'all is well' };
  expect(result.body).toEqual(msg);
  expect(result.status).toBe(200);
});

test('Test for / endpoint',async function(){
    const response = await request(app).get('/api');
    console.log(response)
})
/*      Post Endpoint Testing       */

test('Database should contain a contact after posting to it', async () => {
  const contact: {} = {
    firstname: 'testing1',
    lastname: 'nametesting',
    phone: '08066069526',
    blocked: "false"
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
    blocked: "false"
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
    blocked: "false"
  };
  const result = await request(app)
    .post('/api/')
    .send(contact);
  expect(result.status).toBe(404);
  expect(result.body.id).toBeUndefined();
});


/*          GET Endpoint Testing            */

test('Get Request, Response should contain a specified object', async () => {
    const contact: {} = {
      firstname: 'adedayo',
      lastname: 'adedunye',
      phone: '08066069526',
      id: 1,
      blocked: "false"
    };
    const result = await request(app).get('/api/contacts');
    expect(result.body).toContainEqual(contact);
  });
  
  // test('Get Request, Response should contain a specified object', async () => {
  //   const contact: {} = {
  //     firstname: 'python',
  //     lastname: 'sammy',
  //     phone: '08066069526',
  //     blocked: "false"
  //   };
  //   const contact1: {} = {
  //     firstname: 'mongo',
  //     lastname: 'node',
  //     phone: '08066069526',
  //     blocked: "false"
  //   };
  //   await request(app)
  //     .post('/api/contacts')
  //     .send(contact)
  //     .send(contact1);
  //   const result = await request(app).get('/api/contacts?blocked=false');
  //   expect(result.body).toContain(contact)
  //   expect(result.status).toBe(200);
  // });