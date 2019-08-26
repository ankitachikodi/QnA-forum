const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// mongoose.Schema.Types.ObjectId;
// { type: Schema.Types.ObjectId, ref: "User" }
const QuestionSchema = new Schema({
  //questionID: mongoose.Schema.Types.ObjectId,
  topicID: {
    type: Schema.Types.ObjectId,
    ref: "Topic"
  },
  question: {
    type: String,
    required: true
  },
  userID: {
    type: Number,
    ref: "User"
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  follows: {
    type: Number,
    required: false
  },
  followed: {
    type: Boolean,
    required: false
  }
});


module.exports = mongoose.model("Question", QuestionSchema);
