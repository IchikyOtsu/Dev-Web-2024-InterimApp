const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../db');
const request = supertest(app);

describe('Enterprises API', () => {
    let enterpriseId;

    before(async () => {
        await db.query('BEGIN');
    });

    after(async () => {
        await db.query('ROLLBACK');
    });

    it('POST /api/enterprises - should create a new enterprise', async () => {
        const newEnterprise = {
            name: 'Test Enterprise',
            description: 'This is a test enterprise.',
            logo_url: 'http://example.com/logo.png',
            website_url: 'http://example.com'
        };

        const response = await request
            .post('/api/enterprises')
            .send(newEnterprise)
            .expect(201);

        expect(response.body).to.have.property('id');
        enterpriseId = response.body.id; // Sauvegarde de l'ID de l'entreprise pour les tests suivants
    });

    it('GET /api/enterprises/:id - should return enterprise data', async () => {
        const response = await request
            .get(`/api/enterprises/${enterpriseId}`)
            .expect(200);

        expect(response.body).to.have.property('name', 'Test Enterprise');
    });

    it('PUT /api/enterprises/:id - should update enterprise data', async () => {
        const updatedEnterprise = {
            name: 'Updated Enterprise',
            description: 'This is an updated test enterprise.',
            logo_url: 'http://example.com/new_logo.png',
            website_url: 'http://newexample.com'
        };

        const response = await request
            .put(`/api/enterprises/${enterpriseId}`)
            .send(updatedEnterprise)
            .expect(200);

        expect(response.body).to.have.property('name', 'Updated Enterprise');
    });

    it('DELETE /api/enterprises/:id - should delete the enterprise', async () => {
        await request
            .delete(`/api/enterprises/${enterpriseId}`)
            .expect(204);

        // Vérifie que l'entreprise n'existe plus
        await request
            .get(`/api/enterprises/${enterpriseId}`)
            .expect(404);
    });
});
