import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dbconnect from "./db/connection.js";

dotenv.config({ path: "./.env" });
const app = express();

dbconnect();

// const MONGOURI = process.env.MONGODB_URI;

// (async () => {
//   try {
//     await mongoose.connect(`${MONGOURI}`);
//     console.log("MongoDB connected successfully");
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     process.exit(1);
//   }
// })();
// try {
// } catch (error) {}
