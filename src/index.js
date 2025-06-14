import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import dbconnect from "./db/connection.js";
import authRoutes from "./routes/Authentication.js";
import todoRoutes from "./routes/todoroutes.js";
import cors from "cors";

dotenv.config({
  path: "./.env",
});

const reactport = process.env.REACT_PORT;

const app = express();
app.use(express.json());
dbconnect();

app.use(
  cors({
    origin: `http://localhost:${reactport}`, //React PORT
    credentials: true,
  })
);

app.get("/test", (req, res) => {
  res.json({
    message: "API IS WORKING",
  });
  console.log("API IS WORKING");
});
app.use("/auth", authRoutes);
app.use("/todos", todoRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on Port ${PORT}`);
});

