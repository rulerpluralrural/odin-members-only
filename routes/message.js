const express = require("express");
const router = express.Router();

const messageController = require('../controllers/messageController')

router.get("/", messageController.index);

router.post("/", messageController.message_post);

module.exports = router;
