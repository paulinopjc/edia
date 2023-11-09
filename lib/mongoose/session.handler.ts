import mongoose from "mongoose";

export const session = async () => {
  const session = await mongoose.startSession();
  session.startTransaction();
  return session;
};
