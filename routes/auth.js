const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");

// GET request for login
router.get("/login", authController.login_get);

// POST request for login
router.post("/login", authController.login_post);

// POST request for logout
router.get("/logout", authController.log_out)

// GET request for sign-up
router.get("/sign-up", authController.sign_up_get);

// POST request for sign-up
router.post("/sign-up", authController.sign_up_post);

// GET request for membership
router.get("/membership", authController.member_get);

// PSOT request for membership
router.post("/membership", authController.member_post)

// GET request for admin
router.get("/admin", authController.admin_get);

// PSOT request for admin
router.post("/admin", authController.admin_post)


module.exports = router;
