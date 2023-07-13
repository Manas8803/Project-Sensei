const { UnauthenticatedError } = require("../Errors/index");
const jwt = require("jsonwebtoken");

const authorizationMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		throw new UnauthenticatedError("No token provided");
	}
	const token = authHeader.split("Bearer ")[1]; //& Extracting token
	try {
		const decoded = jwt.verify(token, process.env.JWT_AUTH);
		const { id, name } = decoded;
		req.user = { id, name };
	} catch (err) {
		throw new UnauthenticatedError("Not authorized to access this route");
	}

	next();
};

module.exports = authorizationMiddleware;
