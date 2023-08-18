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

router.get("/tasks", authMiddleware, getAllTasks);
router.post("tasks", authMiddleware, createTask);
router.patch("tasks/:t_id", authMiddleware, updateTask);
router.delete("tasks/:t_id", authMiddleware, deleteTask);

module.exports = router;
