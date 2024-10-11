import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURL = "mongodb://localhost:27017/test";
    const connect = await mongoose.connect(mongoURL);
    // console.log(connect.connection.host);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
