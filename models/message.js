const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema(
	{
		user: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: [true, "User is required"],
		},
		title: {
			type: String,
			required: [true, "Title is required"],
		},
		message: {
			type: String,
			required: [true, "Message is required"],
			minLength: 1,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Message", MessageSchema);
