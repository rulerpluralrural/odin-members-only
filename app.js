import express, { urlencoded } from "express";
import expressSession from "express-session";
import dotenv from "dotenv";
import mongoose from "mongoose";
import passport from "passport";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is listening on PORT ${PORT}...`);
});
