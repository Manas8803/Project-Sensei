const { CustomError } = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class ForbiddenError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.FORBIDDEN;
	}
}

//? Password does not match.

module.exports = { ForbiddenError };
