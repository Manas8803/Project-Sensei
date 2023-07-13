const mongoose = require("mongoose");

const ProjectSchema = {
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
	},
	description: {
		type: String,
	},
	u_id: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
	},
};

module.exports = mongoose.model("Project", ProjectSchema);
