const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all users
router.get('/', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// GET a single user by id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// POST a new user
router.post('/', async (req, res) => {
    try {
        const { username, email, password_hash, role } = req.body;
        const { rows } = await pool.query(
            'INSERT INTO users (username, email, password_hash, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [username, email, password_hash, role]
            );
        res.status(201).json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// PUT (update) a user by id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password_hash, role } = req.body;
        const { rows } = await pool.query(
            'UPDATE users SET username = $1, email = $2, password_hash = $3, role = $4 WHERE id = $5 RETURNING *',
            [username, email, password_hash, role, id]
            );
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

// DELETE a user by id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
        if (rows.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(rows[0]);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;