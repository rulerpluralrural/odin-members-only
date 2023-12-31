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
		.isLength({ min: 1 })
		.withMessage("Title is required"),
	check("message")
		.trim()
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
				user: req.user,
				errors: errors.array(),
			});
			return;
		} else {
			await message.save();

			res.redirect("/");
		}
	}),
];

exports.delete_message_get = asyncHandler(async (req, res) => {
	const message = await Message.findById(req.params.id).exec();

	if (message === null) {
		res.redirect("/");
	}

	res.render("message/delete_message", {
		title: "Only Fams",
		message: message,
		user: req.user,
	});
});

exports.delete_message_post = asyncHandler(async (req, res) => {
	await Message.findByIdAndDelete(req.body.message_id);
	res.redirect("/");
});
