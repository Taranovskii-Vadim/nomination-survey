import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    login: { type: String, required: true },
    role: { type: String, required: true },
    surveysId: { type: [String], required: true },
  },
  { versionKey: false, timestamps: true }
);

export default model("user", userSchema);
