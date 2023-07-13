const { UserConflictError } = require("./UserConflict");
const { CustomError } = require("./CustomError");
const { BadRequestError } = require("./BadRequestError");
const { UnauthenticatedError } = require("./Unauthenticated");
const { ForbiddenError } = require("./ForbiddenError");

module.exports = {
	UserConflictError,
	CustomError,
	BadRequestError,
	UnauthenticatedError,
	ForbiddenError,
};
