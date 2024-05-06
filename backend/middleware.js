const jwt = require("jsonwebtoken");
require("dotenv").config();

function authenticateToken(req, res, next) {
	if (req.path === "/api/login") return next();

	if (!Object.hasOwn(req, "cookies") || !Object.hasOwn(req.cookies, "token"))
		return res.sendStatus(401);

	const token = req.cookies.token;

	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
		console.log(err);

		if (err) return res.sendStatus(403);

		req.user = user;

		next();
	});
}

module.exports = authenticateToken;
