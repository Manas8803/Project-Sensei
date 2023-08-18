const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/Auth");
const {
	getAllTasks,
	createTask,
	updateTask,
	deleteTask,
} = require("../Controllers/task");

router.use(express.json());

router.get("/:p_id/tasks", authMiddleware, getAllTasks);
router.post("/:p_id/tasks", authMiddleware, createTask);
router.patch("/:p_id/tasks/:t_id", authMiddleware, updateTask);
router.delete("/:p_id/tasks/:t_id", authMiddleware, deleteTask);

module.exports = router;
