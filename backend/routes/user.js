const express = require("express");
const { jwtDecode } = require("jwt-decode");
const router = express.Router();

// Route GET pour récupérer tous les profils utilisateur
router.get("/self", (req, res) => {
	const user = req.user;
	res.json({
		id: user.id,
		email: user.email,
		role: user.role,
		enterprise_id: user.enterprise_id,
	});
});

// Route GET pour récupérer un seul profil utilisateur par ID
router.get("/:id", (req, res) => {
	const { id } = req.params;
	const user = users.find((user) => user.id.toString() === id);
	if (user) {
		res.json(user);
	} else {
		res.status(404).send("User not found");
	}
});

module.exports = router;
