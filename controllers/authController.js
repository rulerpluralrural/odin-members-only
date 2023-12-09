const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.login_get = (req, res) => {
	res.send("Login GET");
};

exports.login_post = (req, res) => {
	res.send("Login POST");
};

// Display sign up form on GET
exports.sign_up_get = (req, res) => {
	res.render("auth/sign_up", {
		title: "Sign up",
	});
};

// Handle sign up form on POST
exports.sign_up_post = [
	//Validate and sanitize fields
	body("username")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Username is required"),
	body("password")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Password is required"),
	body("email")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Email is required")
		.isEmail()
		.withMessage("Email is not valid"),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			// If there are errors.
			res.render("auth/sign_up", {
				title: "Sign up",
				errors: errors.array(),
			});
		} else {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash("B4c0//", salt, async function (err, hashedPassword) {
					if (err) {
						return next(err);
					} else {
						// Store hash in your password DB.
						const user = new User({
							username: req.body.username,
							password: hashedPassword,
							email: req.body.email,
						});
						await user.save();
						// Redirect to home page
						res.render("auth/sign_up", {
							title: "Sign up",
							errors: [],
							success_msg: "Sign up successfull!",
						});
					}
				});
			});
		}
	}),
];
