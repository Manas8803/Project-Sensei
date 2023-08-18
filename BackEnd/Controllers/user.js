const User = require("../Models/users");
const {
	UserConflictError,
	BadRequestError,
	ForbiddenError,
} = require("../Errors/index");
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res) => {
	const allUsers = await User.find({});
	res.status(200).json({ Users: allUsers });
};

const getUser = async (req, res) => {
	const { password, email } = req.body;
	if (!email || !password) {
		throw new BadRequestError("Invalid email or password");
	}
	const checkUser = await User.findOne({ email: email });

	if (!checkUser) {
		throw new BadRequestError("Email is not registered");
	} else if (checkUser.password != password) {
		throw new ForbiddenError("Invalid Credentials");
	}

	const { id, name } = checkUser;
	const token = jwt.sign({ id, name }, process.env.JWT_AUTH, {
		expiresIn: "30d",
	});
	res.status(200).json({ status: 1, token: token, name: name });
};

const createUser = async (req, res) => {
	const { name, password, email } = req.body;

	const checkEmail = await User.findOne({ email: email });

	if (checkEmail) {
		//! User already exists in the database.(CAN'T REGEISTER!)
		throw new UserConflictError("Email is already registered.\nPlease Login");
	}

	const user = await User.create({
		name: name,
		password: password,
		email: email,
	});
	const { id } = user;
	const token = jwt.sign({ id, name }, process.env.JWT_AUTH, {
		expiresIn: "30d",
	});
	res.status(200).json({ status: 1, token: token, name: name });
};

const deleteUser = async (req, res) => {
	const { u_id } = req.params;
	const user = await User.findByIdAndDelete(u_id);
	if (!user) {
		throw new BadRequestError("User not found");
	}

	res.status(200).json({ status: 1, user: user });
};

module.exports = { getAllUsers, createUser, getUser, deleteUser };
