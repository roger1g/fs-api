import mongoose from "mongoose";

mongoose.set("strictQuery", true);

export const connectDB = async () => {
  try {
    if (process.env.MONGO_CONNECTION_STRING) {
      await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
        ignoreUndefined: true,
      });
      console.log("MongoDB Connected...");
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};
