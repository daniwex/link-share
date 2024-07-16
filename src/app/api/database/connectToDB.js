import mongoose from "mongoose";

let isConnected = false;

export const connectMongoose = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    return;
  }
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "users-link-share",
      useNewUrlParser: true,
    });
    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
