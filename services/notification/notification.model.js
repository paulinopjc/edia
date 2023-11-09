"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationSchema = void 0;
var mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.Schema({
  policyId: {
    type: mongoose_1.Types.ObjectId,
    required: true,
  },
  agentId: {
    type: mongoose_1.Types.ObjectId,
    required: true,
  },
  updaterAgentId: {
    type: mongoose_1.Types.ObjectId,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
});
exports.Notification = mongoose_1.models.Notification || (0, mongoose_1.model)("Notification", exports.NotificationSchema);
