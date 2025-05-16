import mongoose from "mongoose";

const dbconnect = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}`
    );
    console.log(
      `MongoDB connected successfully! DB Host:
      ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("MongoDB connection Error:", error);
    process.exit(1);
  }
};

export default dbconnect;
