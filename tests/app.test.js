const request = require('supertest');
const app = require('../app'); // adjust path

describe('Test auth', () => {
  it('should register a user', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ email: "test@test.com", password: "pass" });

    expect(res.statusCode).toEqual(201);
  });
});
