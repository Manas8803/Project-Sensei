const Tasks = require("../Models/task");
const { BadRequestError } = require("../Errors/index");

const getAllTasks = async (req, res) => {
	const { p_id } = req.params;

	const allTasks = await Tasks.find({ p_id: p_id });
	res.status(201).json({ status: 1, tasks: allTasks });
};

const createTask = async (req, res) => {
	const { p_id } = req.params;
	console.log(p_id);
	const { name, description, taskStatus } = req.body;
	console.log("In create task");
	if (!p_id || !name || !taskStatus) {
		res.status(204).send();
		return;
	}
	const task = await Tasks.create({
		name: name,
		description: description,
		taskStatus: taskStatus,
		p_id: p_id,
	});
	res.status(201).json({ status: 1, task: task });
};

const deleteTask = async (req, res) => {
	const { t_id } = req.params;
	const task = await Tasks.findByIdAndDelete(t_id);

	if (!task) throw new BadRequestError("Task not found");

	res.status(201).json({ status: 1, task: task });
};

const updateTask = async (req, res) => {
	const { t_id } = req.params;

	const task = await Tasks.findByIdAndUpdate(t_id, req.body, {
		new: true,
		runValidators: true,
	});

	if (!task) throw new BadRequestError("Task not found");

	res.status(201).json({ status: 1, task: task });
};

module.exports = { getAllTasks, createTask, deleteTask, updateTask };
