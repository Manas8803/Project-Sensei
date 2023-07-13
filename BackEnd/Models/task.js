const mongoose = require("mongoose");

const TaskSchema = {
	name: {
		type: String,
		required: [true, "Please enter a name"],
		trim: true,
	},
	description: {
		type: String,
		trim: true,
	},

	taskStatus: {
		type: String,
		default: "incomplete",
		trim: true,
	},

	p_id: {
		type: String,
		required: [true, "Please enter a p_id"],
		trim: true,
	},
};

module.exports = mongoose.model("Task", TaskSchema);
