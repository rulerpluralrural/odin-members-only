const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const passport = require("passport");

// Display login form on Get
exports.login_get = asyncHandler(async (req, res) => {
	// console.log(req.user);
	res.render("auth/login", {
		title: "Login",
		messages: req.session.messages,
	});
});

// Handle login form on POST
exports.login_post = passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/only-fams/login",
	failureMessage: true,
});

exports.log_out = asyncHandler(async (req, res) => {
	req.logout((err) => {
		if (err) {
			return next(err);
		}
		res.redirect("/");
	});
});

// Display sign up form on GET
exports.sign_up_get = asyncHandler(async (req, res) => {
	res.render("auth/sign_up", {
		title: "Sign up",
	});
});

// Handle sign up form on POST
exports.sign_up_post = [
	// Validate and sanitize fields
	check("username")
		.trim()
		.isLength({ min: 1 })
		.escape()
		.withMessage("Username is required")
		.custom(async (value) => {
			const user = await User.findOne({ username: value });
			if (user) {
				throw new Error(
					"Username already in use, Please choose a different one",
				);
			}
		}),
	check("password")
		.trim()
		.isLength({ min: 5 })
		.withMessage("Password is required and must be at least 5 characters long")
		.isLength({ max: 20 })
		.withMessage("Password must not be over 20 characters long"),
	check("confirm-password").custom(async (value, { req }) => {
		if (value !== req.body.password) {
			throw new Error("Password confirmation does not match password");
		}
	}),
	check("email")
		.trim()
		.isLength({ min: 1 })
		.withMessage("Email is required")
		.custom(async (value) => {
			const email = await User.findOne({ email: value });
			if (email) {
				throw new Error(
					"E-mail is not available, Please choose a different one.",
				);
			}
		})
		.isEmail()
		.withMessage("Email is not valid"),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);
		console.log(errors);

		if (!errors.isEmpty()) {
			// If there are errors.
			res.render("auth/sign_up", {
				title: "Sign up",
				errors: errors.array(),
			});
		} else {
			bcrypt.genSalt(10, function (err, salt) {
				bcrypt.hash(
					req.body.password,
					salt,
					async function (err, hashedPassword) {
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
								success_msg:
									"Sign up successfull! You can now log in to Only Fams.",
							});
						}
					},
				);
			});
		}
	}),
];

exports.member_get = asyncHandler(async (req, res) => {
	res.render("auth/membership", {
		title: "Only Fams",
		user: req.user,
	});
});

exports.member_post = asyncHandler(async (req, res) => {
	res.send("Membership POST");
});
