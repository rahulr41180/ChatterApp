
const express = require("express");

const router = express.Router();

const { addMessage, getMessage } = require("../controllers/message.controller");

router.post("/addMessage", addMessage);
router.post("/getMessage", getMessage);

module.exports = router;