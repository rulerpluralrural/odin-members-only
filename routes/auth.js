const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// Get request for login
router.get("/login", authController.login_get);

// POST request for login
router.post("/login", authController.login_post);

// POST request for logout
router.get("/logout", authController.log_out)

// Get request for sign-up
router.get("/sign-up", authController.sign_up_get);

//Post request for sign-up
router.post("/sign-up", authController.sign_up_post);


module.exports = router;
