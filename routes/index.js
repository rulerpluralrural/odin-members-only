const express = require("express");
const router = express.Router();
const messageController = require('../controllers/messageController')

const authRouter = require("./auth.js");
const messageRouter = require("./message.js");

router.get("/", messageController.index)
router.use(authRouter)
router.use(messageRouter)

module.exports = router;
