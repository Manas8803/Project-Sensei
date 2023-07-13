const { CustomError } = require("./CustomError");
const { StatusCodes } = require("http-status-codes");

class UserConflictError extends CustomError {
	constructor(message) {
		super(message);
		this.statusCode = StatusCodes.CONFLICT;
	}
}

//? User already exists in the database.

module.exports = { UserConflictError };
