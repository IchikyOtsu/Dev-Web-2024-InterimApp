const supertest = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const db = require('../db');
const request = supertest(app);

describe('Applications API', () => {
    let applicationId;

    before(async () => {
        await db.query('BEGIN');
    });

    after(async () => {
        await db.query('ROLLBACK');
    });

    it('POST /api/applications - should create a new application', async () => {
        const newApplication = {
            user_id: 1,  // Assurez-vous que cet ID d'utilisateur existe dans votre base de données
            advert_id: 1,  // Assurez-vous que cet ID d'annonce existe dans votre base de données
            status: 'pending'
        };

        const response = await request
            .post('/api/applications')
            .send(newApplication)
            .expect(201);

        expect(response.body).to.have.property('id');
        applicationId = response.body.id; // Sauvegarde de l'ID de l'application pour les tests suivants
    });

    it('GET /api/applications/:id - should return application data', async () => {
        const response = await request
            .get(`/api/applications/${applicationId}`)
            .expect(200);

        expect(response.body).to.have.property('status', 'pending');
    });

    it('PUT /api/applications/:id - should update application data', async () => {
        const updatedApplication = {
            user_id: 1,
            advert_id: 1,
            status: 'accepted'
        };

        const response = await request
            .put(`/api/applications/${applicationId}`)
            .send(updatedApplication)
            .expect(200);

        expect(response.body).to.have.property('status', 'accepted');
    });

    it('DELETE /api/applications/:id - should delete the application', async () => {
        await request
            .delete(`/api/applications/${applicationId}`)
            .expect(204);

        // Vérifie que l'application n'existe plus
        await request
            .get(`/api/applications/${applicationId}`)
            .expect(404);
    });
});
