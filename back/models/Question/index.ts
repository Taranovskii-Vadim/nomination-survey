import { model, Schema } from "mongoose";
import { SCHEMA_OPTIONS } from "../constants";

const questionSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
  },
  SCHEMA_OPTIONS
);

questionSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret._id;
  },
});

export default model("question", questionSchema);
