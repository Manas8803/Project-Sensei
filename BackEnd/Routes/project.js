const express = require("express");
const router = express.Router();
const {
	getAllProjects,
	createProject,
	deleteProject,
} = require("../Controllers/project");
const authMiddleware = require("../Middleware/Auth");

router.use(express.json());

router.get("/", authMiddleware, getAllProjects);
router.post("/", authMiddleware, createProject);
router.delete("/:p_id", authMiddleware, deleteProject);

module.exports = router;
