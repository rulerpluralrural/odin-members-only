const Message = require("../models/message");
const User = require("../models/user");
const asyncHandler = require("express-async-handler");

exports.index = asyncHandler(async (req, res, next) => {
	const [allUsers, allMessages] = await Promise.all([
		User.find(),
		Message.find(),
	]);

	res.render("index", {
		title: "Only Fams",
		messages: allMessages,
		users: allUsers,
		user: req.user,
	});
});

exports.message_get = (req, res) => {
	res.send("Get a message");
};

exports.message_post = (req, res) => {
	res.send("Post a message");
};
