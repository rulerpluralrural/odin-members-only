const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { check, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res) => {
	const [allUsers, allMessages] = await Promise.all([
		User.find().exec(),
		Message.find().populate("user").exec(),
	]);

	res.render("index", {
		title: "Only Fams",
		messages: allMessages,
		users: allUsers,
		user: req.user,
	});
});

exports.message_get = asyncHandler(async (req, res) => {
	const [allUsers, allMessages] = await Promise.all([
		User.find().exec(),
		Message.find().exec(),
	]);

	res.render("message/message_form", {
		title: "Only Fams",
		messages: allMessages,
		users: allUsers,
		user: req.user,
	});
});

exports.message_post = [
	check("title")
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage("Title is required"),
	check("message")
		.trim()
		.escape()
		.isLength({ min: 1 })
		.withMessage("Message is required"),

	asyncHandler(async (req, res, next) => {
		const errors = validationResult(req);

		const message = new Message({
			user: req.user._id,
			title: req.body.title,
			message: req.body.message,
		});

		if (!errors.isEmpty()) {
			res.render("message/message_form", {
				title: "Only Fams",
				errors: errors.array(),
			});
			return;
		} else {
			await message.save();

			res.redirect("/");
		}
	}),
];
