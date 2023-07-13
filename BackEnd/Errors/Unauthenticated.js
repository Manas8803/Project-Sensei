const { CustomError } = require("./CustomError");
const { StatusCodes } = require("http-status-codes");
class UnauthenticatedError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.UNAUTHORIZED;
	}
}

//? Not authorized to access that route.

module.exports = { UnauthenticatedError };
