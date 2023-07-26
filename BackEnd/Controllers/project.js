const Projects = require("../Models/projects");
const { BadRequestError } = require("../Errors/index");
const { NoContentError } = require("../Errors/index");

const getAllProjects = async (req, res) => {
	const { id } = req.user;

	const projects = await Projects.find({ u_id: id });
	res.status(200).json({ status: 1, project: projects });
};

const createProject = async (req, res) => {
	const { id } = req.user;
	const { name, description } = req.body;
	if(!name) throw new NoContentError("No name provided")
	const project = await Projects.create({
		name: name,
		description: description,
		u_id: id,
	});
	res.json({ status: 1, project: project });
};

const deleteProject = async (req, res) => {
	const { p_id } = req.params;

	const project = await Projects.findByIdAndDelete(p_id);
	if (!project) throw new BadRequestError("Project not found");
	res.status(200).send({ status: 1, project: project });
};

module.exports = { getAllProjects, createProject, deleteProject };
