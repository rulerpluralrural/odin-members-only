const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const connectDB = require("./config/db.js");
const path = require("path");
const errorHandler = require("./middleware/error-handler");

require("dotenv").config();

const app = express();

// Routers
const indexRouter = require("./routes/index.js");
const authRouter = require("./routes/auth.js");
const messageRouter = require("./routes/message.js");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", indexRouter);
app.use("/only-fams", authRouter);
app.use("/only-fams", messageRouter);

// Error Handlers
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log(`Server is listening on PORT ${PORT}...`);
		});
	} catch (err) {
		console.log(err);
	}
};

start();
