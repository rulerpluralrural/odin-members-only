const mongoose= require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	username: {
		type: String,
		required: [true, "Name should not be empty"],
		trim: true,
		unique: true,
		minLength: 1,
		maxLength: 50,
	},
	password: {
		type: String,
		required: [true, "Password should not be empty"],
	},
	email: {
		type: String,
		required: [true, "Email should not be empty"],
		unique: true,
		trim: true,
	},
	member: {
		type: Boolean,
		default: false,
	},
	admin: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model("User", UserSchema);
