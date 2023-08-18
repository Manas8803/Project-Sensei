const express = require("express");
const router = express.Router();
const {
	getAllUsers,
	createUser,
	getUser,
	deleteUser,
} = require("../Controllers/user");

router.use(express.json());

router.get("/", getAllUsers);
router.post("/login", getUser);
router.post("/register", createUser);
router.delete("/:u_id", deleteUser);

module.exports = router;
