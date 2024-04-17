import mongoose from "mongoose";

let isConnected = false;
const uri = process.env.MONGODB_URI as string;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(uri, {
      dbName: "share_recipe",
    });

    isConnected = true;

    console.log("MongoDB connected");
  } catch (error) {
    console.log(`Failed to connect to DB, ${error}`);
  }
};
