import mongoose from "mongoose";

const connect = async () => {
  const uri = process.env.MONGODB_URI || "";
  try {
    await mongoose.connect(uri);
  } catch (error) {
    console.log(error);
  }
};

export default connect;
