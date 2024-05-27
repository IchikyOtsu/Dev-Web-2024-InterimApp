// Modification du fichier de test users.test.js pour utiliser CommonJS

const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../db');

const request = supertest(app);

describe('User API', () => {
  beforeEach(async () => {
    await db.query('BEGIN');
  });

  afterEach(async () => {
    await db.query('ROLLBACK');
  });

  it('GET /users - should return all users', async () => {
    const response = await request.get('/users').expect(200);
    expect(response.body).to.be.an('array');
  });

  // Plus de tests...
});
