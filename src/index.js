import mongoose from "mongoose";

const MONGOURI = process.env.MONGODB_URI;

(async () => {
  try {
    mongoose.connect(`${MONGOURI}`);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
})();
try {
} catch (error) {}
