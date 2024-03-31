const express = require('express');
const router = express.Router(); // Utilisez Router au lieu de créer une nouvelle application Express
const adverts = [
    { id: 1, message: "Advert 1" },
    { id: 2, message: "Advert 2" },
    { id: 3, message: "Advert 3" },
];

// GET route for fetching all adverts
router.get('/', (req, res) => {
    res.json(adverts);
});

// GET route for fetching a single advert by id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const advert = adverts.find(ad => ad.id.toString() === id);
    if (advert) {
        res.json(advert);
    } else {
        res.status(404).send('Advert not found');
    }
});

module.exports = router;