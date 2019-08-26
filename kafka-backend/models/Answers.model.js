const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Question = require("./questions.model");
const User = require("./User.model");
//Answer Schema
const answerSchema = mongoose.Schema({
  questionID: { type: Schema.Types.ObjectId, ref: "Question" },
  ownerID: { type: Number, ref: "User" },
  answer: { type: String, required: true },
  // answer: [{ type: String, required: true },
  date: { type: Date, default: Date.now },
  anonymousFlag: { type: Boolean },
  votes: { type: Number, required: false }
});
module.exports = mongoose.model("Answer", answerSchema);
