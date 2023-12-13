const express = require("express");
const router = express.Router();

const messageController = require('../controllers/messageController')

// GET request for message
router.get("/messages", messageController.message_get);

// POST request for message
router.post("/messages", messageController.message_post);

// GET request for delete message
router.get("/messages/:id", messageController.delete_message_get);

// POST request for delete message
router.post("/messages/:id", messageController.delete_message_post);

module.exports = router;
