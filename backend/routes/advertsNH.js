const express = require("express");
const router = express.Router();
const pool = require("../db");

// GET all adverts
router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM adverts");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET a single advert by id
router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const { rows } = await pool.query("SELECT * FROM adverts WHERE id = $1", [
			id,
		]);
		if (rows.length === 0) {
			return res.status(404).send("Advert not found");
		}
		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// GET adverts by enterprise id
router.get("/enterprises/:enterpriseId", async (req, res) => {
	try {
		const { enterpriseId } = req.params;
		const { rows } = await pool.query(
			"SELECT * FROM adverts WHERE enterprise_id = $1",
			[enterpriseId],
		);
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// POST a new advert
router.post("/", async (req, res) => {
	try {
		const {
			enterprise_id,
			title,
			description,
			location,
			start_date,
			end_date,
			salary,
		} = req.body;
		const { rows } = await pool.query(
			"INSERT INTO adverts (enterprise_id, title, description, location, start_date, end_date, salary) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
			[
				enterprise_id,
				title,
				description,
				location,
				start_date,
				end_date,
				salary,
			],
		);
		res.status(201).json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

// PUT (update) an advert by id
// router.put("/:id", async (req, res) => {
// 	try {
// 		const { id } = req.params;
// 		const {
// 			enterprise_id,
// 			title,
// 			description,
// 			location,
// 			start_date,
// 			end_date,
// 			salary,
// 		} = req.body;


// 		const { rows } = await pool.query(
// 			"UPDATE adverts SET enterprise_id = $1, title = $2, description = $3, location = $4, start_date = $5, end_date = $6, salary = $7 WHERE id = $8 RETURNING *",
// 			[
// 				enterprise_id,
// 				title,
// 				description,
// 				location,
// 				start_date,
// 				end_date,
// 				salary,
// 				id,
// 			],
// 		);
// 		if (rows.length === 0) {
// 			return res.status(404).send("Advert not found");
// 		}
// 		res.json(rows[0]);
// 	} catch (error) {
// 		console.error(error.message);
// 		res.status(500).send("Server Error");
// 	}
// });

router.put("/:id", async (req, res) => {
	const formatPostgresDate = (dateString) => {
		if (!dateString) return null; // Retourne null si la chaîne est vide
		const date = new Date(dateString);
		return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
	};

	try {
		const { id } = req.params;
		const { enterprise_id, title, description, location, start_date, end_date, salary } = req.body;

		// Vérification et formatage des dates
		const formattedStartDate = start_date ? formatPostgresDate(start_date) : null;
		const formattedEndDate = end_date ? formatPostgresDate(end_date) : null;

		// Récupérer les données existantes
		const { rows: existingData } = await pool.query("SELECT * FROM adverts WHERE id = $1", [id]);
		if (existingData.length === 0) {
			return res.status(404).se        }
		const oldData = existingData[0];

		// Comparer les données
		const updatedData = {};
		if (enterprise_id !== undefined && enterprise_id !== oldData.enterprise_id) {
			updatedData.enterprise_id = enterprise_id;
		}
		if (title !== undefined && title !== oldData.title) {
			updatedData.title = title;
		}
		if (description !== undefined && description !== oldData.description) {
			updatedData.description = description;
		}
		if (location !== undefined && location !== oldData.location) {
			updatedData.location = location;
		}

		// Les conditions pour les dates (compliqué)
		if (formattedStartDate !== null && formattedStartDate !== oldData.start_date) {
			updatedData.start_date = formattedStartDate;
		} else {
			delete updatedData.start_date; // Supprimer la clé si la valeur est vide
		}

		if (formattedEndDate !== null && formattedEndDate !== oldData.end_date) {
			updatedData.end_date = formattedEndDate;
		} else {
			delete updatedData.end_date; // Supprimer la clé si la valeur est vide
		}

		if (salary !== undefined && salary !== oldData.salary) {
			updatedData.salary = salary;
		}

		if (Object.keys(updatedData).length === 0) {
			return res.status(400).send("No data to update");
		}

		// Mettre à jour les données dans la base de données
		const { rows: updatedRows } = await pool.query(
			"UPDATE adverts SET " +
            Object.keys(updatedData)
                .map((key, index) => `${key} = $${index + 1}`)
                .join(", ") +
            " WHERE id = $" +
            (Object.keys(updatedData).length + 1) +
            " RETURNING *",
			[...Object.values(updatedData), id]
			);

		res.json(updatedRows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});


// DELETE an advert by id
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;

		// Supprimer les candidatures associées à l'annonce
		await pool.query("DELETE FROM applications WHERE advert_id = $1", [id]);

		// Supprimer les plannings associés à l'annonce
		await pool.query("DELETE FROM schedules WHERE advert_id = $1", [id]);

		// Supprimer l'annonce
		const { rows } = await pool.query(
			"DELETE FROM adverts WHERE id = $1 RETURNING *",
			[id]
			);

		if (rows.length === 0) {
			return res.status(404).send("Advert not found");
		}

		res.json(rows[0]);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
