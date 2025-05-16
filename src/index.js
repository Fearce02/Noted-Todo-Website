import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dbconnect from "./db/connection.js";

dotenv.config({
  path: "./.env",
});

const app = express();
console.log(process.env.MONGODB_URI);
dbconnect();
