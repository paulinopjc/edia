import { Schema, Types, model, models } from "mongoose";

export const NotificationSchema = new Schema({
  policyId: {
    type: Types.ObjectId,
    required: true,
  },
  agentId: {
    type: Types.ObjectId,
    required: true,
  },
  updaterAgentId: {
    type: Types.ObjectId,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

const Notification = models.Notification || model("Notification", NotificationSchema);

export default Notification;
