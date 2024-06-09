const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
	try {
		const { rows } = await pool.query("SELECT * FROM adverts");
		res.json(rows);
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
