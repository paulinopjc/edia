import mongoose from "mongoose";

const MONGO_URI = process.env.NEXT_PRIVATE_MONGODB_URL ?? "";
if (!MONGO_URI) throw new Error("MongoDB URI does not exist");

const connectMongo = (handler: any) => async (req: any, res: any) => {
  mongoose
    .connect(MONGO_URI)
    // .then((e) => console.log("success mongoose"))
    .catch((e) => console.log("mongoose error: ", e));

  if (mongoose.connections[0].readyState) {
    // Use current db connection
    return handler(req, res);
  }
  // Use new db connection
  await mongoose.connect(MONGO_URI);
  return handler(req, res);
};

export default connectMongo;
