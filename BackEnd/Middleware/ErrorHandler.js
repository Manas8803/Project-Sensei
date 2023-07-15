const { CustomError } = require("../Errors/index");
const { StatusCodes } = require("http-status-codes");
const errorHandlerMiddleware = (err, req, res, next) => {
	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({ status: 0, msg: err.message });
	}

	return res
		.status(StatusCodes.INTERNAL_SERVER_ERROR)
		.json({ status: 0, msg: err.message });
};

module.exports = errorHandlerMiddleware;
