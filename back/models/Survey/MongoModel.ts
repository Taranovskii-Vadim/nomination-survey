// import { Schema, model } from "mongoose";

// import { SCHEMA_OPTIONS } from "../constants";

// const surveySchema = new Schema(
//   {
//     status: {
//       type: String,
//       required: true,
//     },
//     title: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: false,
//     },
//     questions: {
//       type: [String],
//       required: true,
//     },
//   },
//   SCHEMA_OPTIONS
// );

// surveySchema.set("toJSON", {
//   transform: function (doc, ret, options) {
//     ret.id = ret._id;
//     delete ret.createdAt;
//     delete ret.updatedAt;
//     delete ret._id;
//   },
// });

// export default model("survey", surveySchema);
