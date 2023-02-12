import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const con = mongoose.connect(process.env.MONGO_CLIENT);
  } catch (error) {}
};
