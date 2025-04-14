const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models');
const { userOne, setupDatabase } = require('../fixtures/db');

beforeAll(async () => {
  await setupDatabase();
});

describe('Auth API', () => {
  test('Should register new user', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'testuser',
        email: 'test@example.com',
        password: 'Test@1234',
      })
      .expect(201);

    // Assert user was created in DB
    const user = await User.findByPk(response.body.user.id);
    expect(user).not.toBeNull();
  });

  test('Should login existing user', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: userOne.email,
        password: userOne.password,
      })
      .expect(200);

    expect(response.body.token).toBeDefined();
  });
});

