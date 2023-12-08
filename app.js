import express, { urlencoded } from "express";
import expressSession from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";
import connectDB from "./config/db";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(PORT, () => {
			console.log(`Server is listening on PORT ${PORT}...`);
		});
	} catch (err) {
		console.log(err)
	}
};

start()