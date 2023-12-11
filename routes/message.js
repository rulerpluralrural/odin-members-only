const express = require("express");
const router = express.Router();

const messageController = require('../controllers/messageController')

router.get("/messages", messageController.message_get);

router.post("/messages", messageController.message_post);

module.exports = router;
