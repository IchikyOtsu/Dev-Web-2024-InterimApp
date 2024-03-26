const express = require('express');
const router = express.Router(); // Utilisez Router au lieu de créer une nouvelle application Express
const pool = require('../db');

// Modifier ici pour utiliser `router.get` au lieu de `app.get`
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM Annonces');
    res.json(rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router; // Exportez le router au lieu d'écouter sur un port
