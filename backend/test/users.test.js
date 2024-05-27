const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../db');
const request = supertest(app);

describe('User API', () => {
  let userId;

  before(async () => {
    await db.query('BEGIN');
  });

  after(async () => {
    await db.query('ROLLBACK');
  });

  it('POST /api/users - should create a new user', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      first_name: 'Test',
      last_name: 'User',
      role: 'user',
      enterprise_id: 1  // Assuming this field is required in your schema
    };

    const response = await request
      .post('/api/users')
      .send(newUser)
      .expect(201);

    expect(response.body).to.have.property('id');
    userId = response.body.id; // Save user ID for subsequent tests
  });

  it('GET /api/users/:id - should return user data', async () => {
    const response = await request
      .get(`/api/users/${userId}`)
      .expect(200);

    expect(response.body).to.have.property('username', 'testuser');
    expect(response.body).to.have.property('email', 'testuser@example.com');
  });

  it('PUT /api/users/:id - should update user data', async () => {
    const updatedUser = {
      username: 'updateduser',
      email: 'updateduser@example.com',
      password_hash: 'newpasswordhash',  // Provide the password hash
      first_name: 'Updated',
      last_name: 'User',
      role: 'user'
    };

    const response = await request
      .put(`/api/users/${userId}`)
      .send(updatedUser)
      .expect(200);

    expect(response.body).to.have.property('username', 'updateduser');
    expect(response.body).to.have.property('email', 'updateduser@example.com');
  });

  it('DELETE /api/users/:id - should delete the user', async () => {
    await request
      .delete(`/api/users/${userId}`)
      .expect(204);

    // Verify the user no longer exists
    await request
      .get(`/api/users/${userId}`)
      .expect(404);
  });
});
