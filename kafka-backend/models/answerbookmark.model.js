const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const Answer = require("./Answers.model");
const User = require("./User.model");
//Answer Schema
const answerBookmark = mongoose.Schema({
  answerID: { type: Schema.Types.ObjectId, ref: "Answer" },
  ownerID: { type: Number, ref: "User" }
});
module.exports = mongoose.model("AnswerBookmark", answerBookmark);
