const express = require("express");
const router = express.Router();

// Route GET pour récupérer l'utilisateur de la session
router.get("/self", (req, res) => {
	const user = req.user;
	res.json({
		id: user.id,
		email: user.email,
		role: user.role,
		enterprise_id: user.enterprise_id,
	});
});

module.exports = router;
