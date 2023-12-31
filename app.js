const express = require("express");
const connectDB = require("./config/db.js");
const path = require("path");
const errorHandler = require("./middleware/error-handler");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

// Authentication
const passport = require("passport");
const session = require("express-session");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user");

require("dotenv").config();

const app = express();

// Routers
const homeRouter = require("./routes/index.js");

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(
	session({
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			signed: true,
			sameSite: "lax",
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	}),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// Passport JS
passport.use(
	new LocalStrategy(async (username, password, done) => {
		try {
			const user = await User.findOne({ username: username });

			if (!user) return done(null, false, { message: "Username not found" });

			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					return done(null, user);
				} else {
					return done(null, false, { message: "Invalid password" });
				}
			});
		} catch (error) {
			return done(error);
		}
	}),
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((userId, done) => {
	User.findById(userId)
		.then((user) => {
			done(null, user);
		})
		.catch((err) => done(err));
});

// Routes
app.get("/", (req, res) => {
	res.redirect("/only-fams")
})
app.use("/only-fams", homeRouter);

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
