import { Schema, model } from "mongoose";

import { SCHEMA_OPTIONS } from "../constants";

const userSchema = new Schema(
  {
    login: { type: String, required: true },
    role: { type: String, required: true },
  },
  SCHEMA_OPTIONS
);

export default model("user", userSchema);
