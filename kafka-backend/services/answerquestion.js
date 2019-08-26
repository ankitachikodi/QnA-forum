var Answer = require("../models/Answers.model");
const db = require("../../backend/config/db");
const mongoose = require("mongoose");


function handle_request(msg, callback) {
  console.log("Inside Kafka Method add-course. Message ", msg.body);
  const answers = new Answer({
    _id: new mongoose.Types.ObjectId(),
    questionID: msg.questionID,
    ownerID: msg.ownerID,
    answer: msg.answer,
    anonymousFlag: msg.anonymousFlag
  });
  console.log("Inside  Kafka Backend Add Question");
  answers
    .save()
    .then(result => {
      console.log("Saved new answer saved to DB ");
      callback(null, result);
    })
    .catch(err => {
      console.log("Error saving new answer to db:", err);
      callback(null, err);
    });
}

exports.handle_request = handle_request;
