import { model, Schema } from "mongoose";

const questionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

questionSchema.set("toJSON", {
  transform: function (doc, ret, options) {
    ret.id = ret._id;
    delete ret.createdAt;
    delete ret.updatedAt;
    delete ret._id;
  },
});

export default model("question", questionSchema);
