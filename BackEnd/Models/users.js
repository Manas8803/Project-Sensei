const mongoose = require("mongoose");

const UserSchema = {
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
	},
	password: {
		type: String,
		required: [true, "Please enter a password"],
	},
	email: {
		type: String,
		required: [true, "Please enter email address"],
	},
};

module.exports = mongoose.model("Users", UserSchema);
