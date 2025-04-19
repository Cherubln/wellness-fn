import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    // Use current db connection
    console.log("Already connected to the database.");
    return;
  }

  // Use new db connection
  try {
    await mongoose.connect(process.env.MONGODB_URI!, {});
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw new Error("Failed to connect to the database");
  }
};

export default connectDB;
