const express = require("express");
const router = express.Router();
const pool = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
	try {
		const { email, password } = req.body;

		// Vérifier si l'utilisateur existe dans la base de données
		const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (rows.length === 0) {
			return res.status(401).json({ error: "Invalid email or password" });
		}

		const userData = rows[0];

		// Vérifier le mot de passe
		const isPasswordValid = await bcrypt.compare(
			password,
			userData.password_hash,
		);
		if (!isPasswordValid) {
			return res.status(401).json({ error: "Invalid email or password" });
		}
		// Générer un token JWT
		const token = jwt.sign(
			{
				id: userData.id,
				email: userData.email,
				role: userData.role,
				enterprise_id: userData.enterprise_id,
			},
			process.env.JWT_SECRET,
			{ expiresIn: "1h" },
		);

		// Store token in a cookie
		res.cookie("token", token, { httpOnly: true });
		res.json({ success: true, message: "Login successful" });
	} catch (error) {
		console.error(error.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
