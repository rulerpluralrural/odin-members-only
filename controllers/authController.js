const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

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

	asyncHandler(async (req, res) => {
		const errors = validationResult(req);

		// Create new user with sanitized data
		const user = new User({
			username: req.body.username,
			password: req.body.password,
			email: req.body.email,
		});

		if (!errors.isEmpty()) {
			// If there are errors.
			res.render("auth/sign_up", {
				title: "Sign up",
				user: user,
				errors: errors.array(),
			});
		} else {
			// If data form is valid
			await user.save();
			// Redirect to home page
			res.redirect("/only-fams");
		}
	}),
];
