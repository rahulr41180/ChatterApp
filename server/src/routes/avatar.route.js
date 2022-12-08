
const express = require("express");

const router = express.Router();

const { userAvatar } = require("../controllers/avatar.controller");

router.patch("/:id", userAvatar);

module.exports = router;