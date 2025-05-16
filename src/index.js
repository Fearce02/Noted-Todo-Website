import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dbconnect from "./db/connection.js";
import authRoutes from "./routes/Authentication.js";
import todoRoutes from "./routes/todoroutes.js";
dotenv.config({
  path: "./.env",
});

const app = express();
app.use(express.json());
console.log(process.env.MONGODB_URI);
dbconnect();

app.get("/eg", () => {
  console.log("API IS WORKING");
});
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});
