
const express = require("express");

const router = express.Router();

const { allUsersRatherThenCurrentUser } = require("../controllers/allUser.controller");

router.get("/:id", allUsersRatherThenCurrentUser);

module.exports = router;