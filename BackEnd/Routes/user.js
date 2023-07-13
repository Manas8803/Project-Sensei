const express = require("express");
const router = express.Router();
const { getAllUsers, createUser, getUser } = require("../Controllers/user");

router.use(express.json());

router.get("/", getAllUsers);
router.post("/login", getUser);
router.post("/register", createUser);

module.exports = router;
