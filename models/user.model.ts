const { Schema, model, models, Model } = require("mongoose");
const { Roles } = require("@typedefs/roles");

const SecurityQuestionsSchema = new Schema({
  question: { type: String, required: true },
  answer: { type: String, required: true },
});

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      default: Roles.AGENT,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    securityQuestions: {
      type: [SecurityQuestionsSchema],
      required: false,
    },
    lastLogin: Date,
  },
  { timestamps: true, versionKey: false }
);

const User = models.User || model("User", UserSchema);

export default User;
