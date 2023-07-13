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

router.get("/:p_id", authMiddleware, getAllTasks);
router.post("/:p_id", authMiddleware, createTask);
router.patch("/:t_id", authMiddleware, updateTask);
router.delete("/:t_id", authMiddleware, deleteTask);

module.exports = router;
