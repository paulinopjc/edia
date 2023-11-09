import { Schema, model, models, Document, Model } from "mongoose";

export const LogsSchema = new Schema(
  {
    username: { type: String, required: true },
    IP: { type: String, required: true },
    role: { type: String }, // only needed for logged in users
    method: { type: String, required: true },
    action: { type: String, required: true },
    payload: { type: String },
    createdAt: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const Logs = models.Logs || model("Logs", LogsSchema);

export default Logs;
